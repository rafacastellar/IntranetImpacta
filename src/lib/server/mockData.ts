export interface MockUser {
	id: string;
	nome: string;
	email: string;
	perfil: 'Professor' | 'Coordenador' | 'Secretaria' | 'NDE' | 'Direção';
	cargo: string;
	departamento: string;
}

export const CURRENT_USER: MockUser = {
	id: 'u-101',
	nome: 'Prof. Carlos Eduardo Silveira',
	email: 'carlos.silveira@impacta.edu.br',
	perfil: 'Coordenador',
	cargo: 'Coordenador de ADS & Membro NDE',
	departamento: 'Tecnologia da Informação'
};

export interface MockAviso {
	id: number;
	titulo: string;
	conteudo: string;
	categoria: 'Infraestrutura' | 'Acadêmico' | 'Institucional' | 'Geral';
	prioridade: 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';
	autor: string;
	data_publicacao: string;
	ativo: boolean;
	turmas?: string[];
}

export const MOCK_AVISOS: MockAviso[] = [
	{
		id: 1,
		titulo: 'Manutenção Emergencial no Datacenter / Laboratórios 3 e 4',
		conteudo:
			'A equipe de infraestrutura de TI informa que no sábado (12/11) a partir das 14h haverá atualização de switches nos Laboratórios 3 e 4. O acesso à rede cabeada estará temporariamente indisponível.',
		categoria: 'Infraestrutura',
		prioridade: 'URGENTE',
		autor: 'Equipe de Infraestrutura',
		data_publicacao: '2026-11-07T10:30:00Z',
		ativo: true,
		turmas: ['ADS-3A', 'ADS-4B', 'ES-2A']
	},
	{
		id: 2,
		titulo: 'Prazo Limite para Lançamento de Notas da Prova PAI',
		conteudo:
			'Lembramos a todos os docentes que o sistema acadêmico estará aberto para consolidação das notas e frequência até a próxima quarta-feira. Em caso de dúvidas, consulte o manual de procedimentos.',
		categoria: 'Acadêmico',
		prioridade: 'ALTA',
		autor: 'Secretaria Acadêmica',
		data_publicacao: '2026-11-06T14:15:00Z',
		ativo: true
	},
	{
		id: 3,
		titulo: 'Convocatória para Reunião Extraordinária do NDE',
		conteudo:
			'Convocamos todos os membros titulares do NDE do curso de Engenharia de Software para alinhamento das diretrizes curriculares e atualização das matrizes do MEC.',
		categoria: 'Institucional',
		prioridade: 'MEDIA',
		autor: 'Coordenação de Curso',
		data_publicacao: '2026-11-05T09:00:00Z',
		ativo: true
	},
	{
		id: 4,
		titulo: 'Disponibilidade de Novos Projetores Interativos',
		conteudo:
			'As salas 201 a 208 do Bloco B foram equipadas com projetores laser de alta definição com suporte a conexão sem fio (Miracast e AirPlay).',
		categoria: 'Infraestrutura',
		prioridade: 'BAIXA',
		autor: 'Apoio Operacional',
		data_publicacao: '2026-11-04T16:45:00Z',
		ativo: true
	}
];

export interface MockAta {
	id: number;
	reuniao_id: number;
	titulo: string;
	tipo_reuniao: 'NDE' | 'Colegiado' | 'Docente Geral';
	curso: string;
	autor: string;
	data_reuniao: string;
	status: 'RASCUNHO' | 'PUBLICADA' | 'REVISAO';
	versao: number;
	pauta_previa: string;
	conteudo_realizado: string;
	participantes: string[];
}

export const MOCK_ATAS: MockAta[] = [
	{
		id: 101,
		reuniao_id: 201,
		titulo: 'Ata da 4ª Reunião Ordinária do NDE — ADS 2026/2',
		tipo_reuniao: 'NDE',
		curso: 'Análise e Desenvolvimento de Sistemas',
		autor: 'Prof. Carlos Eduardo Silveira',
		data_reuniao: '2026-11-03T18:00:00Z',
		status: 'PUBLICADA',
		versao: 1,
		pauta_previa:
			'1. Avaliação do desempenho discente no simulado PAI.\n2. Adequação da bibliografia básica para computação em nuvem.\n3. Planejamento das oficinas de extensão tecnológica.',
		conteudo_realizado:
			'Aos três dias de novembro de 2026, reuniu-se o Núcleo Docente Estruturante do curso de ADS sob a presidência do coordenador. Foram discutidas as taxas de adesão ao simulado e aprovada por unanimidade a inclusão de novas referências sobre arquitetura serverless no plano de ensino.',
		participantes: [
			'Prof. Carlos Eduardo Silveira',
			'Profa. Mariana Costa',
			'Prof. Roberto Mendes',
			'Prof. Lucas Faria'
		]
	},
	{
		id: 102,
		reuniao_id: 202,
		titulo: 'Ata de Colegiado — Planejamento de Estágios e TCCs',
		tipo_reuniao: 'Colegiado',
		curso: 'Engenharia de Software',
		autor: 'Profa. Dra. Juliana Freitas',
		data_reuniao: '2026-10-28T17:30:00Z',
		status: 'PUBLICADA',
		versao: 2,
		pauta_previa:
			'1. Cronograma de bancas finais de TCC 2026/2.\n2. Novos convênios de estágio com empresas parceiras de tecnologia.',
		conteudo_realizado:
			'Deliberou-se pelo encerramento das submissões de relatórios de estágio até 30 de novembro. Definidas as bancas avaliadoras de TCC com a participação de convidados externos da indústria.',
		participantes: [
			'Profa. Dra. Juliana Freitas',
			'Prof. Fernando Dias',
			'Prof. André Castro'
		]
	},
	{
		id: 103,
		reuniao_id: 203,
		titulo: 'Minuta de Ata — Revisão Curricular MEC 2027',
		tipo_reuniao: 'NDE',
		curso: 'Redes e Cibersegurança',
		autor: 'Prof. Marcos Vinicius',
		data_reuniao: '2026-11-06T19:00:00Z',
		status: 'RASCUNHO',
		versao: 1,
		pauta_previa:
			'1. Mapeamento dos novos requisitos de conformidade curricular do MEC.\n2. Carga horária prática em laboratórios virtuais de ciberataques.',
		conteudo_realizado:
			'Em elaboração pelos membros do NDE. Pauta em análise com parecer pendente do representante discente.',
		participantes: ['Prof. Marcos Vinicius', 'Profa. Helena Lima']
	}
];

export interface MockSubstituicao {
	id: number;
	professor_titular: string;
	professor_substituto: string;
	curso: string;
	turma: string;
	disciplina: string;
	data_substituicao: string;
	horario: string;
	sala: string;
	motivo: string;
	status: 'SOLICITADO' | 'APROVADO' | 'CONCLUIDO' | 'CANCELADO';
}

export const MOCK_SUBSTITUICOES: MockSubstituicao[] = [
	{
		id: 1,
		professor_titular: 'Prof. Lucas Faria',
		professor_substituto: 'Prof. Carlos Eduardo Silveira',
		curso: 'Análise e Desenvolvimento de Sistemas',
		turma: 'ADS-4A',
		disciplina: 'Arquitetura de Microsserviços',
		data_substituicao: '2026-11-10',
		horario: '19:15 - 21:00',
		sala: 'Lab 05',
		motivo: 'Participação em conferência internacional de computação gráfica.',
		status: 'APROVADO'
	},
	{
		id: 2,
		professor_titular: 'Profa. Mariana Costa',
		professor_substituto: 'Prof. Roberto Mendes',
		curso: 'Engenharia de Software',
		turma: 'ES-3B',
		disciplina: 'Engenharia de Requisitos',
		data_substituicao: '2026-11-13',
		horario: '08:00 - 09:45',
		sala: 'Sala 302',
		motivo: 'Acompanhamento médico agendado.',
		status: 'SOLICITADO'
	}
];

export interface MockDocumento {
	id: number;
	titulo: string;
	categoria: 'Normas MEC' | 'Procedimentos Docentes' | 'Benefícios' | 'Acadêmico';
	resumo: string;
	atualizado_em: string;
	palavras_chave: string[];
}

export const MOCK_DOCUMENTOS: MockDocumento[] = [
	{
		id: 1,
		titulo: 'Guia de Diretrizes para Avaliações PAI (Prova de Avaliação Integrada)',
		categoria: 'Acadêmico',
		resumo:
			'Instruções sobre matriz de competências, critérios de elaboração de questões multidisciplinares e cronograma de envio das questões para validação pelo NDE.',
		atualizado_em: '2026-10-15',
		palavras_chave: ['PAI', 'Avaliação', 'Provas', 'Competências', 'MEC']
	},
	{
		id: 2,
		titulo: 'Manual de Solicitação de Reembolso de Despesas Docentes e Eventos',
		categoria: 'Procedimentos Docentes',
		resumo:
			'Passo a passo com formulários e comprovantes exigidos pela controladoria para ressarcimento de inscrições em simpósios, viagens acadêmicas e publicações científicas.',
		atualizado_em: '2026-09-20',
		palavras_chave: ['Reembolso', 'Viagem', 'Congresso', 'Financeiro']
	},
	{
		id: 3,
		titulo: 'Regulamento de Licença Sabática e Afastamento para Doutorado',
		categoria: 'Benefícios',
		resumo:
			'Normas e critérios de elegibilidade para solicitação de dedicação exclusiva e períodos de pesquisa para docentes em programas de pós-graduação stricto sensu.',
		atualizado_em: '2026-08-10',
		palavras_chave: ['Doutorado', 'Pesquisa', 'Licença', 'Sabática']
	},
	{
		id: 4,
		titulo: 'Manual de Conformidade Regulatória e Instrumento de Avaliação do MEC',
		categoria: 'Normas MEC',
		resumo:
			'Referencial com os indicadores das dimensões de corpo docente, infraestrutura e organização didático-pedagógica para reconhecimento e renovação de cursos.',
		atualizado_em: '2026-10-01',
		palavras_chave: ['MEC', 'Regulação', 'NDE', 'Conformidade', 'Auditoria']
	}
];

