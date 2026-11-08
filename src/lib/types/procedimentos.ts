export interface CategoriaDocumento {
	id: number;
	nome: string;
	descricao?: string | null;
}

export interface DocumentoPolitica {
	id: number;
	autor_id: string;
	categoria_id: number;
	titulo: string;
	resumo: string | null;
	conteudo_html: string | null;
	arquivo_url: string | null;
	palavras_chave: string[];
	ativo: boolean | null;
	criado_em: string | null;
	categoria?: CategoriaDocumento | null;
	autor?: {
		id: string;
		nome: string;
		email: string;
	} | null;
}

