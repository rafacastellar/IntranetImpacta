export interface UsuarioItem {
	id: string;
	nome: string;
	email: string;
	senha?: string | null;
	perfil_id: number;
	ativo: boolean | null;
	criado_em: string | null;
	perfis?: { id: number; nome: string; descricao?: string | null } | null;
	usuario_perfis?: Array<{ perfil_id: number; perfis?: { id: number; nome: string } | null }>;
	usuario_cursos?: Array<{ curso_id: number; cursos?: { id: number; codigo: string; nome: string } | null }>;
}

export interface PerfilOption {
	id: number;
	nome: string;
	descricao?: string | null;
}

export interface CursoOption {
	id: number;
	codigo: string;
	nome: string;
	ativo?: boolean | null;
}

