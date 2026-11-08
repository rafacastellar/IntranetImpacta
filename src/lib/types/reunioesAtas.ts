export interface AtaItem {
	id: number;
	reuniao_id: number;
	autor_id: string;
	pauta_previa: string | null;
	conteudo_realizado: string | null;
	status: 'RASCUNHO' | 'PUBLICADA' | 'REVISAO';
	versao: number;
	arquivo_url: string | null;
	criado_em: string;
	publicado_em: string | null;
	autor?: {
		id: string;
		nome: string;
		email: string;
	} | null;
}

export interface ReuniaoParticipante {
	usuario_id: string;
	usuario?: {
		id: string;
		nome: string;
		email: string;
	} | null;
}

export interface ReuniaoItem {
	id: number;
	organizador_id: string;
	curso_id: number | null;
	titulo: string;
	descricao: string | null;
	tipo_reuniao: 'NDE' | 'Colegiado' | 'Docente' | 'Geral';
	data_hora_inicio: string;
	data_hora_fim: string;
	local_link: string | null;
	status: 'AGENDADA' | 'REALIZADA' | 'CANCELADA';
	organizador?: {
		id: string;
		nome: string;
		email: string;
	} | null;
	curso?: {
		id: number;
		codigo: string;
		nome: string;
	} | null;
	atas?: AtaItem | null;
	reuniao_participantes?: ReuniaoParticipante[];
}

export interface CursoOption {
	id: number;
	codigo: string;
	nome: string;
}

export interface UsuarioOption {
	id: string;
	nome: string;
	email: string;
}

