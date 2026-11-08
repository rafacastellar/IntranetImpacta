import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';
import type { DocumentoPolitica, CategoriaDocumento } from '$lib/types/procedimentos';

export const load: PageServerLoad = async ({ locals }) => {
	const { session, user: authUser } = await locals.safeGetSession();

	if (!session || !authUser) {
		throw redirect(303, '/login');
	}

	// 1. Busca todos os documentos e políticas ativas
	const { data: rawDocs } = await supabaseAdmin
		.from('documentos_politicas')
		.select(`
			id,
			autor_id,
			categoria_id,
			titulo,
			resumo,
			conteudo_html,
			arquivo_url,
			palavras_chave,
			ativo,
			criado_em,
			categoria:categorias_documento(id, nome, descricao),
			autor:usuarios(id, nome, email)
		`)
		.eq('ativo', true)
		.order('id', { ascending: true });

	// 2. Busca categorias disponíveis
	const { data: rawCats } = await supabaseAdmin
		.from('categorias_documento')
		.select('id, nome, descricao')
		.order('id', { ascending: true });

	// 3. Busca nome do usuário autenticado
	const { data: dbUser } = await supabaseAdmin
		.from('usuarios')
		.select('nome')
		.eq('email', authUser.email || '')
		.maybeSingle();

	const userName = dbUser?.nome || (authUser.user_metadata?.nome as string) || 'Corpo Docente';

	return {
		documentos: (rawDocs as unknown as DocumentoPolitica[]) || [],
		categorias: (rawCats as unknown as CategoriaDocumento[]) || [],
		userName,
		simulatedRole: locals.simulatedRole || 'Professor'
	};
};

export const actions: Actions = {
	criarDocumento: async ({ request, locals }) => {
		const { session, user: authUser } = await locals.safeGetSession();
		if (!session || !authUser) return fail(401, { error: 'Não autorizado' });

		const formData = await request.formData();
		const titulo = formData.get('titulo')?.toString().trim() ?? '';
		const resumo = formData.get('resumo')?.toString().trim() ?? '';
		const conteudo_html = formData.get('conteudo_html')?.toString().trim() ?? '';
		const categoria_id = Number(formData.get('categoria_id'));
		const tagsStr = formData.get('palavras_chave')?.toString().trim() ?? '';
		const palavras_chave = tagsStr
			? tagsStr.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
			: [];

		if (!titulo || !resumo || !categoria_id) {
			return fail(400, { error: 'Preencha todos os campos obrigatórios.' });
		}

		// Obtém o ID do autor na tabela usuarios
		const { data: dbUser } = await supabaseAdmin
			.from('usuarios')
			.select('id')
			.eq('email', authUser.email || '')
			.maybeSingle();

		const autorId = dbUser?.id || authUser.id;

		const { error: insertError } = await supabaseAdmin
			.from('documentos_politicas')
			.insert({
				autor_id: autorId,
				categoria_id,
				titulo,
				resumo,
				conteudo_html: conteudo_html || `<p>${resumo}</p>`,
				palavras_chave,
				ativo: true
			});

		if (insertError) {
			return fail(500, { error: `Erro ao cadastrar documento: ${insertError.message}` });
		}

		return { success: true, message: 'Documento/tutorial cadastrado com sucesso!' };
	}
};

