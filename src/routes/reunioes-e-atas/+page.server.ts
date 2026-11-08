import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';
import type { ReuniaoItem, CursoOption, UsuarioOption } from '$lib/types/reunioesAtas';
import type { Database } from '$lib/types/supabase';

export const load: PageServerLoad = async ({ locals }) => {
	const { session, user: authUser } = await locals.safeGetSession();
	if (!session || !authUser) throw redirect(303, '/login');

	const { data: dbUser } = await supabaseAdmin
		.from('usuarios')
		.select('id, nome, email')
		.eq('email', authUser.email || '')
		.maybeSingle();

	const currentUserId = dbUser?.id || authUser.id;
	const userName = dbUser?.nome || (authUser.user_metadata?.nome as string) || 'Coordenador / NDE';

	const [{ data: rawReunioes }, { data: rawCursos }, { data: rawUsuarios }] = await Promise.all([
		supabaseAdmin.from('reunioes').select(`
			id, organizador_id, curso_id, titulo, descricao, tipo_reuniao, data_hora_inicio, data_hora_fim, local_link, status,
			organizador:usuarios!reunioes_organizador_id_fkey(id, nome, email),
			curso:cursos!reunioes_curso_id_fkey(id, codigo, nome),
			atas(id, reuniao_id, autor_id, pauta_previa, conteudo_realizado, status, versao, arquivo_url, criado_em, publicado_em, autor:usuarios(id, nome, email)),
			reuniao_participantes(usuario_id, usuario:usuarios(id, nome, email))
		`).order('data_hora_inicio', { ascending: false }),
		supabaseAdmin.from('cursos').select('id, codigo, nome').eq('ativo', true).order('nome', { ascending: true }),
		supabaseAdmin.from('usuarios').select('id, nome, email').eq('ativo', true).order('nome', { ascending: true })
	]);

	const reunioes: ReuniaoItem[] = (rawReunioes as unknown as ReuniaoItem[]) || [];

	return {
		reunioes,
		cursos: (rawCursos as CursoOption[]) || [],
		usuarios: (rawUsuarios as UsuarioOption[]) || [],
		currentUserId,
		userName,
		simulatedRole: locals.simulatedRole || 'Coordenador'
	};
};

export const actions: Actions = {
	agendarReuniao: async ({ request, locals }) => {
		const { session, user: authUser } = await locals.safeGetSession();
		if (!session || !authUser) return fail(401, { error: 'Não autorizado' });

		const formData = await request.formData();
		const titulo = formData.get('titulo')?.toString().trim() ?? '';
		const tipo_reuniao = formData.get('tipo_reuniao')?.toString().trim() ?? 'NDE';
		const curso_id = formData.get('curso_id') ? Number(formData.get('curso_id')) : null;
		const data_inicio = formData.get('data_inicio')?.toString().trim() ?? '';
		const data_fim = formData.get('data_fim')?.toString().trim() ?? '';
		const local_link = formData.get('local_link')?.toString().trim() ?? '';
		const descricao = formData.get('descricao')?.toString().trim() ?? '';
		const pauta_previa = formData.get('pauta_previa')?.toString().trim() ?? '';
		const participantesIds = formData.getAll('participantes').map((id) => id.toString());

		if (!titulo || !data_inicio || !data_fim) {
			return fail(400, { error: 'Título, data de início e término são obrigatórios.' });
		}

		const { data: dbUser } = await supabaseAdmin.from('usuarios').select('id').eq('email', authUser.email || '').maybeSingle();
		const organizadorId = dbUser?.id || authUser.id;

		// 1. Cria reunião
		const { data: novaReuniao, error: rErr } = await supabaseAdmin.from('reunioes').insert({
			organizador_id: organizadorId,
			curso_id,
			titulo,
			descricao,
			tipo_reuniao,
			data_hora_inicio: new Date(data_inicio).toISOString(),
			data_hora_fim: new Date(data_fim).toISOString(),
			local_link,
			status: 'AGENDADA'
		}).select('id').single();

		if (rErr || !novaReuniao) {
			return fail(500, { error: `Erro ao agendar reunião: ${rErr?.message}` });
		}

		// 2. Cria Ata Prévia (Pauta)
		await supabaseAdmin.from('atas').insert({
			reuniao_id: novaReuniao.id,
			autor_id: organizadorId,
			pauta_previa,
			status: 'RASCUNHO',
			versao: 1
		});

		// 3. Cadastra participantes
		if (participantesIds.length > 0) {
			const rows = participantesIds.map((uid) => ({ reuniao_id: novaReuniao.id, usuario_id: uid }));
			await supabaseAdmin.from('reuniao_participantes').insert(rows);
		}

		return { success: true, message: 'Reunião agendada e pauta prévia registrada com sucesso!' };
	},

	salvarAta: async ({ request, locals }) => {
		const { session, user: authUser } = await locals.safeGetSession();
		if (!session || !authUser) return fail(401, { error: 'Não autorizado' });

		const formData = await request.formData();
		const ata_id = Number(formData.get('ata_id'));
		const reuniao_id = Number(formData.get('reuniao_id'));
		const pauta_previa = formData.get('pauta_previa')?.toString().trim() ?? '';
		const conteudo_realizado = formData.get('conteudo_realizado')?.toString().trim() ?? '';
		const status = formData.get('status')?.toString().trim() ?? 'PUBLICADA';
		const versao = Number(formData.get('versao') || 1) + 1;

		if (!ata_id) return fail(400, { error: 'Ata não identificada.' });

		const updatePayload: Database['public']['Tables']['atas']['Update'] = {
			pauta_previa,
			conteudo_realizado,
			status,
			versao
		};

		if (status === 'PUBLICADA') {
			updatePayload.publicado_em = new Date().toISOString();
			await supabaseAdmin.from('reunioes').update({ status: 'REALIZADA' }).eq('id', reuniao_id);
		}

		const { error: aErr } = await supabaseAdmin.from('atas').update(updatePayload).eq('id', ata_id);
		if (aErr) return fail(500, { error: `Erro ao salvar ata: ${aErr.message}` });

		return { success: true, message: status === 'PUBLICADA' ? 'Ata homologada e publicada com sucesso!' : 'Ata salva em revisão.' };
	}
};
