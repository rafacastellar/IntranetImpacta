-- ========================================================
-- Intranet Coordenação & Corpo Docente — Faculdade Impacta
-- Migração Inicial de Banco de Dados com RLS (Supabase)
-- ========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --------------------------------------------------------
-- MÓDULO 1: Usuários, Perfis, Cursos e NDE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS perfis (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT
);

CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    perfil_id INT NOT NULL REFERENCES perfis(id),
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE IF NOT EXISTS cursos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nome VARCHAR(150) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS usuario_cursos (
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    curso_id INT REFERENCES cursos(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, curso_id)
);

CREATE TABLE IF NOT EXISTS nde_membros (
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
CREATE TABLE IF NOT EXISTS reunioes (
    id BIGSERIAL PRIMARY KEY,
    organizador_id UUID NOT NULL REFERENCES usuarios(id),
    curso_id INT REFERENCES cursos(id),
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    tipo_reuniao VARCHAR(50) NOT NULL, -- NDE, Colegiado, Geral
    data_hora_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    data_hora_fim TIMESTAMP WITH TIME ZONE NOT NULL,
    local_link TEXT,
    status VARCHAR(30) DEFAULT 'AGENDADA' -- AGENDADA, REALIZADA, CANCELADA
);

CREATE TABLE IF NOT EXISTS reuniao_participantes (
    reuniao_id BIGINT REFERENCES reunioes(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    PRIMARY KEY (reuniao_id, usuario_id)
);

CREATE TABLE IF NOT EXISTS atas (
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
CREATE TABLE IF NOT EXISTS turmas (
    id SERIAL PRIMARY KEY,
    curso_id INT NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    semestre_letivo VARCHAR(20) NOT NULL,
    turno VARCHAR(30) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS disciplinas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    carga_horaria INT NOT NULL
);

CREATE TABLE IF NOT EXISTS turma_disciplinas (
    turma_id INT REFERENCES turmas(id) ON DELETE CASCADE,
    disciplina_id INT REFERENCES disciplinas(id) ON DELETE CASCADE,
    PRIMARY KEY (turma_id, disciplina_id)
);

CREATE TABLE IF NOT EXISTS professor_turmas (
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    turma_id INT REFERENCES turmas(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, turma_id)
);

CREATE TABLE IF NOT EXISTS categorias_aviso (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    cor_hex VARCHAR(7) DEFAULT '#007eb1'
);

CREATE TABLE IF NOT EXISTS avisos (
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

CREATE TABLE IF NOT EXISTS aviso_turmas (
    aviso_id BIGINT REFERENCES avisos(id) ON DELETE CASCADE,
    turma_id INT REFERENCES turmas(id) ON DELETE CASCADE,
    PRIMARY KEY (aviso_id, turma_id)
);

CREATE TABLE IF NOT EXISTS substituicoes_aula (
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

CREATE TABLE IF NOT EXISTS eventos_calendario (
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
CREATE TABLE IF NOT EXISTS comunicados_direcionados (
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

CREATE TABLE IF NOT EXISTS comunicado_leituras (
    comunicado_id BIGINT REFERENCES comunicados_direcionados(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    lido_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    PRIMARY KEY (comunicado_id, usuario_id)
);

-- --------------------------------------------------------
-- MÓDULO 5: Base de Conhecimento e Políticas Institucionais
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS categorias_documento (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT
);

CREATE TABLE IF NOT EXISTS documentos_politicas (
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

-- --------------------------------------------------------
-- HABILITAÇÃO DE ROW LEVEL SECURITY (RLS)
-- --------------------------------------------------------
ALTER TABLE perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuario_cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE nde_membros ENABLE ROW LEVEL SECURITY;
ALTER TABLE reunioes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reuniao_participantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE atas ENABLE ROW LEVEL SECURITY;
ALTER TABLE turmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE disciplinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE turma_disciplinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE professor_turmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias_aviso ENABLE ROW LEVEL SECURITY;
ALTER TABLE avisos ENABLE ROW LEVEL SECURITY;
ALTER TABLE aviso_turmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE substituicoes_aula ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos_calendario ENABLE ROW LEVEL SECURITY;
ALTER TABLE comunicados_direcionados ENABLE ROW LEVEL SECURITY;
ALTER TABLE comunicado_leituras ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias_documento ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos_politicas ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------
-- POLÍTICAS RLS (LEITURA E ESCRITA REGRADA)
-- --------------------------------------------------------
-- Tabelas Públicas / Globais de Leitura (para usuários autenticados)
CREATE POLICY "Leitura de perfis para autenticados" ON perfis FOR SELECT TO authenticated USING (true);
CREATE POLICY "Leitura de usuarios para autenticados" ON usuarios FOR SELECT TO authenticated USING (ativo = true);
CREATE POLICY "Leitura de cursos para autenticados" ON cursos FOR SELECT TO authenticated USING (ativo = true);
CREATE POLICY "Leitura de usuario_cursos para autenticados" ON usuario_cursos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Leitura de nde_membros para autenticados" ON nde_membros FOR SELECT TO authenticated USING (ativo = true);
CREATE POLICY "Leitura de turmas para autenticados" ON turmas FOR SELECT TO authenticated USING (ativo = true);
CREATE POLICY "Leitura de disciplinas para autenticados" ON disciplinas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Leitura de turma_disciplinas para autenticados" ON turma_disciplinas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Leitura de professor_turmas para autenticados" ON professor_turmas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Leitura de categorias_aviso para autenticados" ON categorias_aviso FOR SELECT TO authenticated USING (true);
CREATE POLICY "Leitura de categorias_documento para autenticados" ON categorias_documento FOR SELECT TO authenticated USING (true);
CREATE POLICY "Leitura de documentos_politicas para autenticados" ON documentos_politicas FOR SELECT TO authenticated USING (ativo = true);
CREATE POLICY "Leitura de eventos_calendario para autenticados" ON eventos_calendario FOR SELECT TO authenticated USING (true);

-- Avisos e Mural
CREATE POLICY "Visualizacao de avisos ativos" ON avisos FOR SELECT TO authenticated USING (ativo = true);
CREATE POLICY "Criacao de avisos por coordenacao e secretaria" ON avisos FOR INSERT TO authenticated WITH CHECK (auth.uid() = autor_id);
CREATE POLICY "Atualizacao de avisos pelo autor" ON avisos FOR UPDATE TO authenticated USING (auth.uid() = autor_id);

-- Reuniões e Atas
CREATE POLICY "Visualizacao de reunioes para autenticados" ON reunioes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Criacao de reunioes por autenticados" ON reunioes FOR INSERT TO authenticated WITH CHECK (auth.uid() = organizador_id);
CREATE POLICY "Atualizacao de reuniao pelo organizador" ON reunioes FOR UPDATE TO authenticated USING (auth.uid() = organizador_id);

CREATE POLICY "Visualizacao de participantes" ON reuniao_participantes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Gerenciamento de participantes" ON reuniao_participantes FOR ALL TO authenticated USING (true);

CREATE POLICY "Visualizacao de atas publicadas ou pelo autor" ON atas FOR SELECT TO authenticated USING (status = 'PUBLICADA' OR autor_id = auth.uid());
CREATE POLICY "Criacao de atas pelo autor" ON atas FOR INSERT TO authenticated WITH CHECK (auth.uid() = autor_id);
CREATE POLICY "Atualizacao de atas pelo autor" ON atas FOR UPDATE TO authenticated USING (auth.uid() = autor_id);

-- Substituições
CREATE POLICY "Visualizacao de substituicoes para autenticados" ON substituicoes_aula FOR SELECT TO authenticated USING (true);
CREATE POLICY "Solicitacao de substituicao pelo titular" ON substituicoes_aula FOR INSERT TO authenticated WITH CHECK (auth.uid() = professor_titular_id);
CREATE POLICY "Atualizacao de substituicao por titular ou substituto" ON substituicoes_aula FOR UPDATE TO authenticated USING (auth.uid() = professor_titular_id OR auth.uid() = professor_substituto_id);

-- Comunicados e Leituras
CREATE POLICY "Visualizacao de comunicados direcionados" ON comunicados_direcionados FOR SELECT TO authenticated USING (true);
CREATE POLICY "Envio de comunicados direcionados" ON comunicados_direcionados FOR INSERT TO authenticated WITH CHECK (auth.uid() = remetente_id);
CREATE POLICY "Leitura e confirmacao pelo proprio usuario" ON comunicado_leituras FOR ALL TO authenticated USING (auth.uid() = usuario_id);

-- --------------------------------------------------------
-- DADOS INICIAIS (SEED)
-- --------------------------------------------------------
INSERT INTO perfis (id, nome, descricao) VALUES
(1, 'Professor', 'Acesso ao mural, calendário, substituições e consulta de atas'),
(2, 'Coordenador', 'Gestão de cursos, turmas, reuniões, comunicados e atas'),
(3, 'Secretaria', 'Operação logística de avisos, pautas, salas e repositório'),
(4, 'NDE', 'Núcleo Docente Estruturante com gestão de conformidade MEC'),
(5, 'Direção', 'Auditoria geral e acompanhamento institucional')
ON CONFLICT (id) DO NOTHING;

INSERT INTO categorias_aviso (id, nome, cor_hex) VALUES
(1, 'Infraestrutura', '#f44336'),
(2, 'Acadêmico', '#007eb1'),
(3, 'Institucional', '#7d498a'),
(4, 'Geral', '#555555')
ON CONFLICT (id) DO NOTHING;

INSERT INTO categorias_documento (id, nome, descricao) VALUES
(1, 'Normas MEC', 'Instrumentos regulatórios, diretrizes curriculares e portarias'),
(2, 'Procedimentos Docentes', 'Manuais operacionais, chamadas, provas e notas'),
(3, 'Benefícios', 'Licenças, auxílios, sabática e convênios'),
(4, 'Acadêmico', 'Calendário letivo, Prova PAI e projetos pedagógicos')
ON CONFLICT (id) DO NOTHING;

INSERT INTO cursos (id, codigo, nome, ativo) VALUES
(1, 'ADS', 'Análise e Desenvolvimento de Sistemas', true),
(2, 'ES', 'Engenharia de Software', true),
(3, 'RC', 'Redes de Computadores e Cibersegurança', true),
(4, 'BD', 'Ciência de Dados e Banco de Dados', true)
ON CONFLICT (id) DO NOTHING;

