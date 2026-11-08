export interface ComunicadoLeitura {
	usuario_id: string;
	lido_em: string;
	usuario?: {
		id: string;
		nome: string;
		email: string;
	} | null;
}

export interface ComunicadoItem {
	id: number;
	remetente_id: string;
	perfil_id_alvo: number | null;
	curso_id_alvo: number | null;
	turma_id_alvo: number | null;
	titulo: string;
	mensagem: string;
	alvo_tipo: 'TODOS' | 'PERFIL' | 'CURSO' | 'TURMA';
	data_envio: string;
	remetente?: {
		id: string;
		nome: string;
		email: string;
	} | null;
	perfil_alvo?: {
		id: number;
		nome: string;
	} | null;
	curso_alvo?: {
		id: number;
		codigo: string;
		nome: string;
	} | null;
	turma_alvo?: {
		id: number;
		codigo: string;
		turno: string;
	} | null;
	comunicado_leituras?: ComunicadoLeitura[];
	lido_pelo_usuario?: boolean;
	lido_em_usuario?: string | null;
	total_leituras?: number;
}

export interface PerfilOption {
	id: number;
	nome: string;
}

export interface CursoOption {
	id: number;
	codigo: string;
	nome: string;
}

export interface TurmaOption {
	id: number;
	codigo: string;
	turno: string;
}

