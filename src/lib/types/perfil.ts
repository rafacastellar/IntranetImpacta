export interface PerfilUsuarioData {
	id: string;
	nome: string;
	email: string;
	senha?: string | null;
	perfil_id?: number;
	ativo?: boolean | null;
	criado_em?: string | null;
}
