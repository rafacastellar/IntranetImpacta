-- Habilitar extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------
-- MÓDULO 1: Usuários, Perfis, Cursos e NDE
-- --------------------------------------------------------
CREATE TABLE perfis (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT
);

CREATE TABLE usuarios (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    perfil_id INT NOT NULL REFERENCES perfis(id),
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nome VARCHAR(150) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE usuario_cursos (
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    curso_id INT REFERENCES cursos(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, curso_id)
);

CREATE TABLE nde_membros (
    id SERIAL PRIMARY KEY,
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    curso_id INT NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
    cargo VARCHAR(100) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    ativo BOOLEAN DEFAULT TRUE
);

-- --------------------------------------------------------
-- MÓDULO 2: Gestão de Reuniões e Atas (Compliance MEC)
-- --------------------------------------------------------
CREATE TABLE reunioes (
    id BIGSERIAL PRIMARY KEY,
    organizador_id UUID NOT NULL REFERENCES usuarios(id),
    curso_id INT REFERENCES cursos(id),
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    tipo_reuniao VARCHAR(50) NOT NULL, -- Ex: NDE, Colegiado, Geral
    data_hora_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    data_hora_fim TIMESTAMP WITH TIME ZONE NOT NULL,
    local_link TEXT,
    status VARCHAR(30) DEFAULT 'AGENDADA' -- AGENDADA, REALIZADA, CANCELADA
);

CREATE TABLE reuniao_participantes (
    reuniao_id BIGINT REFERENCES reunioes(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    PRIMARY KEY (reuniao_id, usuario_id)
);

CREATE TABLE atas (
    id BIGSERIAL PRIMARY KEY,
    reuniao_id BIGINT UNIQUE NOT NULL REFERENCES reunioes(id) ON DELETE CASCADE,
    autor_id UUID NOT NULL REFERENCES usuarios(id),
    pauta_previa TEXT,
    conteudo_realizado TEXT,
    status VARCHAR(30) DEFAULT 'RASCUNHO', -- RASCUNHO, PUBLICADA, REVISAO
    versao INT DEFAULT 1,
    arquivo_url TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    publicado_em TIMESTAMP WITH TIME ZONE
);

-- --------------------------------------------------------
-- MÓDULO 3: Mural, Calendário, Turmas e Substituições
-- --------------------------------------------------------
CREATE TABLE turmas (
    id SERIAL PRIMARY KEY,
    curso_id INT NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    semestre_letivo VARCHAR(20) NOT NULL,
    turno VARCHAR(30) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE disciplinas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    carga_horaria INT NOT NULL
);

CREATE TABLE turma_disciplinas (
    turma_id INT REFERENCES turmas(id) ON DELETE CASCADE,
    disciplina_id INT REFERENCES disciplinas(id) ON DELETE CASCADE,
    PRIMARY KEY (turma_id, disciplina_id)
);

CREATE TABLE professor_turmas (
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    turma_id INT REFERENCES turmas(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, turma_id)
);

CREATE TABLE categorias_aviso (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    cor_hex VARCHAR(7) DEFAULT '#3B82F6'
);

CREATE TABLE avisos (
    id BIGSERIAL PRIMARY KEY,
    autor_id UUID NOT NULL REFERENCES usuarios(id),
    categoria_id INT NOT NULL REFERENCES categorias_aviso(id),
    titulo VARCHAR(200) NOT NULL,
    conteudo TEXT NOT NULL,
    prioridade VARCHAR(20) DEFAULT 'MEDIA', -- BAIXA, MEDIA, ALTA, URGENTE
    data_publicacao TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    data_expiracao TIMESTAMP WITH TIME ZONE,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE aviso_turmas (
    aviso_id BIGINT REFERENCES avisos(id) ON DELETE CASCADE,
    turma_id INT REFERENCES turmas(id) ON DELETE CASCADE,
    PRIMARY KEY (aviso_id, turma_id)
);

CREATE TABLE substituicoes_aula (
    id BIGSERIAL PRIMARY KEY,
    professor_titular_id UUID NOT NULL REFERENCES usuarios(id),
    professor_substituto_id UUID REFERENCES usuarios(id),
    turma_id INT NOT NULL REFERENCES turmas(id),
    data_substituicao DATE NOT NULL,
    horario VARCHAR(50) NOT NULL,
    sala VARCHAR(50),
    motivo TEXT,
    status VARCHAR(30) DEFAULT 'SOLICITADO' -- SOLICITADO, APROVADO, CONCLUIDO, CANCELADO
);

CREATE TABLE eventos_calendario (
    id BIGSERIAL PRIMARY KEY,
    curso_id INT REFERENCES cursos(id),
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    data_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    data_fim TIMESTAMP WITH TIME ZONE NOT NULL,
    tipo_evento VARCHAR(50) NOT NULL
);

-- --------------------------------------------------------
-- MÓDULO 4: Comunicação Direcionada e Confirmação de Leitura
-- --------------------------------------------------------
CREATE TABLE comunicados_direcionados (
    id BIGSERIAL PRIMARY KEY,
    remetente_id UUID NOT NULL REFERENCES usuarios(id),
    perfil_id_alvo INT REFERENCES perfis(id),
    curso_id_alvo INT REFERENCES cursos(id),
    turma_id_alvo INT REFERENCES turmas(id),
    titulo VARCHAR(200) NOT NULL,
    mensagem TEXT NOT NULL,
    alvo_tipo VARCHAR(30) NOT NULL, -- TODOS, PERFIL, CURSO, TURMA
    data_envio TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE comunicado_leituras (
    comunicado_id BIGINT REFERENCES comunicados_direcionados(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    lido_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    PRIMARY KEY (comunicado_id, usuario_id)
);

-- --------------------------------------------------------
-- MÓDULO 5: Base de Conhecimento e Políticas Institucionais
-- --------------------------------------------------------
CREATE TABLE categorias_documento (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT
);

CREATE TABLE documentos_politicas (
    id BIGSERIAL PRIMARY KEY,
    autor_id UUID NOT NULL REFERENCES usuarios(id),
    categoria_id INT NOT NULL REFERENCES categorias_documento(id),
    titulo VARCHAR(200) NOT NULL,
    resumo TEXT,
    conteudo_html TEXT,
    arquivo_url TEXT,
    palavras_chave TEXT[],
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);