import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';

const USER_SELECT = `
	id,
	nome,
	email,
	perfil_id,
	ativo,
	criado_em,
	usuario_perfis(perfil_id, perfis(id, nome, descricao))
`;

export const load: PageServerLoad = async ({ locals }) => {
	const { session, user: authUser } = await locals.safeGetSession();
	if (!session || !authUser) throw redirect(303, '/login');

	// 1. Busca os dados do usuário autenticado (ou por e-mail no fallback)
	let { data: usuario } = await locals.supabase
		.from('usuarios')
		.select(USER_SELECT)
		.eq('id', authUser.id)
		.maybeSingle();

	if (!usuario && authUser.email) {
		const { data: byEmail } = await supabaseAdmin
			.from('usuarios')
			.select(USER_SELECT)
			.eq('email', authUser.email)
			.maybeSingle();
		usuario = byEmail;
	}

	if (!usuario) throw redirect(303, '/login');
	const usuarioId = usuario.id;

	// 2. Busca cursos associados e associações ao NDE
	const [{ data: usuarioCursos }, { data: ndeMembros }] = await Promise.all([
		supabaseAdmin
			.from('usuario_cursos')
			.select('curso_id, cursos(id, codigo, nome, ativo)')
			.eq('usuario_id', usuarioId),
		supabaseAdmin
			.from('nde_membros')
			.select('id, cargo, data_inicio, data_fim, ativo, cursos(codigo, nome)')
			.eq('usuario_id', usuarioId)
	]);

	return {
		usuario,
		cursos: usuarioCursos?.map((uc: any) => uc.cursos).filter(Boolean) || [],
		ndeMembros: ndeMembros || [],
		simulatedRole: locals.simulatedRole || 'Coordenador'
	};
};

export const actions: Actions = {
	updatePerfil: async ({ request, locals }) => {
		const { session, user: authUser } = await locals.safeGetSession();
		if (!session || !authUser) {
			return fail(401, { error: 'Sessão expirada. Faça login novamente.' });
		}

		const formData = await request.formData();
		const nome = formData.get('nome')?.toString().trim() ?? '';
		const novaSenha = formData.get('nova_senha')?.toString() ?? '';
		const confirmarSenha = formData.get('confirmar_senha')?.toString() ?? '';

		if (!nome) return fail(400, { error: 'O nome completo é obrigatório.' });

		// Atualiza na tabela usuarios
		const { error: updateError } = await supabaseAdmin
			.from('usuarios')
			.update({ nome })
			.eq('email', authUser.email || '');

		if (updateError) {
			return fail(500, { error: 'Ocorreu um erro ao atualizar os dados do usuário.' });
		}

		if (novaSenha) {
			if (novaSenha.length < 6) {
				return fail(400, { error: 'A nova senha deve possuir no mínimo 6 caracteres.' });
			}
			if (novaSenha !== confirmarSenha) {
				return fail(400, { error: 'A confirmação de senha não confere.' });
			}

			const { error: pwdError } = await locals.supabase.auth.updateUser({ password: novaSenha });
			if (pwdError) {
				return fail(400, { error: `Erro ao alterar a senha: ${pwdError.message}` });
			}

			await supabaseAdmin
				.from('usuarios')
				.update({ senha: novaSenha })
				.eq('email', authUser.email || '');

			return { success: true, message: 'Nome e senha atualizados com sucesso!' };
		}

		return { success: true, message: 'Dados do perfil atualizados com sucesso!' };
	}
};
