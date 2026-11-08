import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';
import type { UsuarioItem, PerfilOption, CursoOption } from '$lib/types/gestaoUsuarios';

export const load: PageServerLoad = async ({ locals }) => {
	const { session, user: authUser } = await locals.safeGetSession();

	if (!session || !authUser) {
		throw redirect(303, '/login');
	}

	// 1. Busca todos os usuários com perfis e cursos vinculados
	const { data: rawUsuarios, error: errUsuarios } = await supabaseAdmin
		.from('usuarios')
		.select(`
			id,
			nome,
			email,
			senha,
			perfil_id,
			ativo,
			criado_em,
			perfis:perfis!usuarios_perfil_id_fkey(id, nome, descricao),
			usuario_perfis(perfil_id, perfis:perfis(id, nome)),
			usuario_cursos(curso_id, cursos(id, codigo, nome))
		`)
		.order('nome', { ascending: true });

	// 2. Busca lista de perfis disponíveis
	const { data: rawPerfis } = await supabaseAdmin
		.from('perfis')
		.select('*')
		.order('id', { ascending: true });

	// 3. Busca lista de cursos disponíveis
	const { data: rawCursos } = await supabaseAdmin
		.from('cursos')
		.select('*')
		.eq('ativo', true)
		.order('nome', { ascending: true });

	const usuarios = (rawUsuarios as unknown as UsuarioItem[]) || [];
	const perfis = (rawPerfis as unknown as PerfilOption[]) || [];
	const cursos = (rawCursos as unknown as CursoOption[]) || [];

	const { data: dbUser } = await supabaseAdmin
		.from('usuarios')
		.select('id, nome, email')
		.eq('email', authUser.email || '')
		.maybeSingle();

	const userName = dbUser?.nome || (authUser.user_metadata?.nome as string) || 'Secretaria Acadêmica';

	return {
		usuarios,
		perfis,
		cursos,
		currentUserId: authUser.id,
		userName,
		simulatedRole: locals.simulatedRole || 'Secretaria'
	};
};

export const actions: Actions = {
	criarUsuario: async ({ request, locals }) => {
		const { session } = await locals.safeGetSession();
		if (!session) return fail(401, { error: 'Não autorizado' });

		const formData = await request.formData();
		const nome = formData.get('nome')?.toString().trim() ?? '';
		const email = formData.get('email')?.toString().trim().toLowerCase() ?? '';
		const senha = formData.get('senha')?.toString() ?? 'Impacta@2026';
		const perfilId = Number(formData.get('perfil_id'));
		const cursosIds = formData.getAll('cursos').map((c) => Number(c));

		if (!nome || !email || !perfilId) {
			return fail(400, { error: 'Preencha todos os campos obrigatórios (Nome, E-mail e Perfil).' });
		}

		if (senha.length < 6) {
			return fail(400, { error: 'A senha inicial deve ter no mínimo 6 caracteres.' });
		}

		// 1. Cria usuário no Supabase Authentication
		const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
			email,
			password: senha,
			email_confirm: true,
			user_metadata: { nome }
		});

		if (authError || !authData.user) {
			return fail(400, { error: `Erro na autenticação: ${authError?.message || 'Falha ao registrar'}` });
		}

		const newUserId = authData.user.id;

		// 2. Insere na tabela usuarios (modelo canônico e diagrama de Chen)
		const { error: dbError } = await supabaseAdmin.from('usuarios').insert({
			id: newUserId,
			nome,
			email,
			senha,
			perfil_id: perfilId,
			ativo: true
		});

		if (dbError) {
			await supabaseAdmin.auth.admin.deleteUser(newUserId);
			return fail(500, { error: `Erro ao salvar usuário no banco: ${dbError.message}` });
		}

		// 3. Insere perfil principal na tabela usuario_perfis
		await supabaseAdmin.from('usuario_perfis').insert({
			usuario_id: newUserId,
			perfil_id: perfilId
		});

		// 4. Insere vínculos com cursos selecionados
		if (cursosIds.length > 0) {
			const vinculos = cursosIds.map((curso_id) => ({
				usuario_id: newUserId,
				curso_id
			}));
			await supabaseAdmin.from('usuario_cursos').insert(vinculos);
		}

		return {
			success: true,
			message: `Usuário ${nome} cadastrado com sucesso!`
		};
	},

	toggleStatus: async ({ request, locals }) => {
		const { session } = await locals.safeGetSession();
		if (!session) return fail(401, { error: 'Não autorizado' });

		const formData = await request.formData();
		const userId = formData.get('id')?.toString() ?? '';

		if (!userId) return fail(400, { error: 'ID do usuário não fornecido.' });

		const { data: user } = await supabaseAdmin
			.from('usuarios')
			.select('ativo, nome')
			.eq('id', userId)
			.single();

		if (!user) return fail(404, { error: 'Usuário não encontrado.' });

		const novoStatus = !user.ativo;

		await supabaseAdmin
			.from('usuarios')
			.update({ ativo: novoStatus })
			.eq('id', userId);

		return {
			success: true,
			message: `Status de ${user.nome} alterado para ${novoStatus ? 'Ativo' : 'Inativo'}.`
		};
	},

	resetSenha: async ({ request, locals }) => {
		const { session } = await locals.safeGetSession();
		if (!session) return fail(401, { error: 'Não autorizado' });

		const formData = await request.formData();
		const userId = formData.get('id')?.toString() ?? '';
		const novaSenha = formData.get('nova_senha')?.toString() ?? 'Impacta@2026';

		if (!userId) return fail(400, { error: 'ID do usuário não fornecido.' });

		// Atualiza no Auth
		const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
			password: novaSenha
		});

		if (authError) return fail(500, { error: `Erro ao resetar senha: ${authError.message}` });

		// Atualiza na tabela usuarios
		await supabaseAdmin
			.from('usuarios')
			.update({ senha: novaSenha })
			.eq('id', userId);

		return {
			success: true,
			message: 'Senha do usuário redefinida para a senha temporária padrão!'
		};
	}
};

