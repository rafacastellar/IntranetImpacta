import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';
import type { ComunicadoItem, PerfilOption, CursoOption, TurmaOption } from '$lib/types/impactaDirect';

export const load: PageServerLoad = async ({ locals }) => {
	const { session, user: authUser } = await locals.safeGetSession();
	if (!session || !authUser) throw redirect(303, '/login');

	// 1. Busca usuário atual no banco
	const { data: dbUser } = await supabaseAdmin
		.from('usuarios')
		.select('id, nome, email, perfil_id')
		.eq('email', authUser.email || '')
		.maybeSingle();

	const currentUserId = dbUser?.id || authUser.id;
	const userName = dbUser?.nome || (authUser.user_metadata?.nome as string) || 'Coordenador Acadêmico';

	// 2. Busca comunicados e opções em paralelo
	const [{ data: rawComms }, { data: perfis }, { data: cursos }, { data: turmas }, { count: totalAtivos }] = await Promise.all([
		supabaseAdmin.from('comunicados_direcionados').select(`
			id, remetente_id, perfil_id_alvo, curso_id_alvo, turma_id_alvo, titulo, mensagem, alvo_tipo, data_envio,
			remetente:usuarios!comunicados_direcionados_remetente_id_fkey(id, nome, email),
			perfil_alvo:perfis!comunicados_direcionados_perfil_id_alvo_fkey(id, nome),
			curso_alvo:cursos!comunicados_direcionados_curso_id_alvo_fkey(id, codigo, nome),
			turma_alvo:turmas!comunicados_direcionados_turma_id_alvo_fkey(id, codigo, turno),
			comunicado_leituras(usuario_id, lido_em, usuario:usuarios(id, nome, email))
		`).order('data_envio', { ascending: false }),
		supabaseAdmin.from('perfis').select('id, nome').order('id', { ascending: true }),
		supabaseAdmin.from('cursos').select('id, codigo, nome').eq('ativo', true).order('nome', { ascending: true }),
		supabaseAdmin.from('turmas').select('id, codigo, turno').eq('ativo', true).order('codigo', { ascending: true }),
		supabaseAdmin.from('usuarios').select('*', { count: 'exact', head: true }).eq('ativo', true)
	]);

	const comunicados: ComunicadoItem[] = (rawComms || []).map((c: any) => {
		const leituras = c.comunicado_leituras || [];
		const minhaLeitura = leituras.find((l: any) => l.usuario_id === currentUserId);
		return {
			...c,
			lido_pelo_usuario: !!minhaLeitura,
			lido_em_usuario: minhaLeitura?.lido_em || null,
			total_leituras: leituras.length
		};
	});

	return {
		comunicados,
		perfis: (perfis as PerfilOption[]) || [],
		cursos: (cursos as CursoOption[]) || [],
		turmas: (turmas as TurmaOption[]) || [],
		currentUserId,
		userName,
		totalDestinatariosBase: totalAtivos || 10,
		simulatedRole: locals.simulatedRole || 'Coordenador'
	};
};

export const actions: Actions = {
	enviarComunicado: async ({ request, locals }) => {
		const { session, user: authUser } = await locals.safeGetSession();
		if (!session || !authUser) return fail(401, { error: 'Não autorizado' });

		const formData = await request.formData();
		const titulo = formData.get('titulo')?.toString().trim() ?? '';
		const mensagem = formData.get('mensagem')?.toString().trim() ?? '';
		const alvo_tipo = (formData.get('alvo_tipo')?.toString().trim() ?? 'TODOS') as ComunicadoItem['alvo_tipo'];
		const perfil_id_alvo = formData.get('perfil_id_alvo') ? Number(formData.get('perfil_id_alvo')) : null;
		const curso_id_alvo = formData.get('curso_id_alvo') ? Number(formData.get('curso_id_alvo')) : null;
		const turma_id_alvo = formData.get('turma_id_alvo') ? Number(formData.get('turma_id_alvo')) : null;

		if (!titulo || !mensagem) {
			return fail(400, { error: 'O título e a mensagem são obrigatórios.' });
		}

		const { data: dbUser } = await supabaseAdmin
			.from('usuarios')
			.select('id')
			.eq('email', authUser.email || '')
			.maybeSingle();

		const remetenteId = dbUser?.id || authUser.id;

		const { error: insertError } = await supabaseAdmin
			.from('comunicados_direcionados')
			.insert({
				remetente_id: remetenteId,
				alvo_tipo,
				perfil_id_alvo: alvo_tipo === 'PERFIL' ? perfil_id_alvo : null,
				curso_id_alvo: alvo_tipo === 'CURSO' ? curso_id_alvo : null,
				turma_id_alvo: alvo_tipo === 'TURMA' ? turma_id_alvo : null,
				titulo,
				mensagem,
				data_envio: new Date().toISOString()
			});

		if (insertError) {
			return fail(500, { error: `Erro ao enviar comunicado: ${insertError.message}` });
		}

		return { success: true, message: 'Comunicado direcionado enviado com sucesso!' };
	},

	confirmarLeitura: async ({ request, locals }) => {
		const { session, user: authUser } = await locals.safeGetSession();
		if (!session || !authUser) return fail(401, { error: 'Não autorizado' });

		const formData = await request.formData();
		const comunicado_id = Number(formData.get('comunicado_id'));

		if (!comunicado_id) return fail(400, { error: 'ID do comunicado inválido.' });

		const { data: dbUser } = await supabaseAdmin
			.from('usuarios')
			.select('id')
			.eq('email', authUser.email || '')
			.maybeSingle();

		const usuarioId = dbUser?.id || authUser.id;

		const { error: readError } = await supabaseAdmin
			.from('comunicado_leituras')
			.upsert({
				comunicado_id,
				usuario_id: usuarioId,
				lido_em: new Date().toISOString()
			}, { onConflict: 'comunicado_id,usuario_id' });

		if (readError) {
			return fail(500, { error: `Erro ao registrar confirmação: ${readError.message}` });
		}

		return { success: true, message: 'Confirmação de leitura registrada com sucesso!' };
	}
};
