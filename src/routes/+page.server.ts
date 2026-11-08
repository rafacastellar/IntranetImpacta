import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	CURRENT_USER,
	MOCK_AVISOS,
	MOCK_ATAS,
	MOCK_SUBSTITUICOES,
	MOCK_DOCUMENTOS
} from '$lib/server/mockData';

export const load: PageServerLoad = async ({ locals }) => {
	const { session, user: authUser } = await locals.safeGetSession();

	if (!session || !authUser) {
		throw redirect(303, '/login');
	}

	let avisos = MOCK_AVISOS;
	let atas = MOCK_ATAS;
	let user = CURRENT_USER;

	try {
		// Busca o usuário autenticado com seus múltiplos perfis no Supabase
		const { data: dbUser } = await locals.supabase
			.from('usuarios')
			.select('*, usuario_perfis(perfil_id, perfis(nome))')
			.eq('email', authUser.email || 'carlos.silveira@impacta.edu.br')
			.maybeSingle();

		if (dbUser) {
			const perfisList = (dbUser as any).usuario_perfis?.map((p: any) => p.perfis?.nome) || [];
			user = {
				id: dbUser.id,
				nome: dbUser.nome,
				email: dbUser.email,
				perfil: 'Coordenador',
				cargo: perfisList.length > 0 ? perfisList.join(' • ') : 'Coordenador & NDE',
				departamento: 'Tecnologia da Informação'
			};
		}

		// Busca avisos cadastrados no banco Supabase
		const { data: dbAvisos, error: errAvisos } = await locals.supabase
			.from('avisos')
			.select('*, categorias_aviso(nome)')
			.eq('ativo', true)
			.order('data_publicacao', { ascending: false });

		if (!errAvisos && dbAvisos && dbAvisos.length > 0) {
			avisos = dbAvisos.map((a: any) => ({
				id: a.id,
				titulo: a.titulo,
				conteudo: a.conteudo,
				categoria: a.categorias_aviso?.nome || 'Geral',
				prioridade: a.prioridade as any,
				autor: 'Coordenação Acadêmica',
				data_publicacao: a.data_publicacao,
				ativo: a.ativo
			}));
		}

		// Busca cursos para opções de filtro
		const { data: cursos } = await locals.supabase
			.from('cursos')
			.select('*')
			.eq('ativo', true);

		return {
			user,
			avisos,
			atas,
			substituicoes: MOCK_SUBSTITUICOES,
			documentos: MOCK_DOCUMENTOS,
			cursos: cursos || []
		};
	} catch {
		return {
			user: CURRENT_USER,
			avisos: MOCK_AVISOS,
			atas: MOCK_ATAS,
			substituicoes: MOCK_SUBSTITUICOES,
			documentos: MOCK_DOCUMENTOS,
			cursos: []
		};
	}
};
