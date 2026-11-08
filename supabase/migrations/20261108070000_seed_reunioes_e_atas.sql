-- Seed para Módulo 2: Gestão de Reuniões e Compliance de Atas (MEC)

DO $$
DECLARE
    v_autor_id UUID;
    v_outro_id UUID;
    v_r1_id BIGINT;
    v_r2_id BIGINT;
    v_r3_id BIGINT;
    v_r4_id BIGINT;
BEGIN
    SELECT id INTO v_autor_id FROM usuarios WHERE email = 'carlos.silveira@impacta.edu.br' LIMIT 1;
    IF v_autor_id IS NULL THEN
        SELECT id INTO v_autor_id FROM usuarios LIMIT 1;
    END IF;

    SELECT id INTO v_outro_id FROM usuarios WHERE email = 'edsoncosta@impacta.edu.br' LIMIT 1;
    IF v_outro_id IS NULL THEN
        v_outro_id := v_autor_id;
    END IF;

    -- 1. Reunião Realizada (Ata Homologada MEC)
    INSERT INTO reunioes (
        organizador_id, curso_id, titulo, descricao, tipo_reuniao,
        data_hora_inicio, data_hora_fim, local_link, status
    ) VALUES (
        v_autor_id, 1, -- ADS
        '4ª Reunião Ordinária do NDE — ADS 2026/1',
        'Reunião ordinária para análise de desempenho discente no simulado PAI e atualização de bibliografia.',
        'NDE',
        NOW() - INTERVAL '5 days',
        NOW() - INTERVAL '5 days' + INTERVAL '2 hours',
        'https://teams.microsoft.com/l/meetup-join/impacta-nde-ads',
        'REALIZADA'
    ) RETURNING id INTO v_r1_id;

    -- Ata da Reunião 1
    INSERT INTO atas (
        reuniao_id, autor_id, pauta_previa, conteudo_realizado, status, versao, arquivo_url, criado_em, publicado_em
    ) VALUES (
        v_r1_id, v_autor_id,
        '1. Avaliação do desempenho discente no simulado PAI.\n2. Adequação da bibliografia básica para computação em nuvem.\n3. Planejamento das oficinas de extensão tecnológica.',
        'Aos três dias do mês corrente, reuniu-se ordinariamente o Núcleo Docente Estruturante do curso de ADS. Foram analisados os índices de acerto por competência no simulado PAI e aprovada por unanimidade a atualização das ementas com foco em microsserviços e computação em nuvem conforme diretrizes do MEC.',
        'PUBLICADA', 1, '/docs/ata_nde_ads_4a_reuniao_2026.pdf',
        NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days'
    ) ON CONFLICT (reuniao_id) DO NOTHING;

    -- 2. Reunião de Colegiado Realizada
    INSERT INTO reunioes (
        organizador_id, curso_id, titulo, descricao, tipo_reuniao,
        data_hora_inicio, data_hora_fim, local_link, status
    ) VALUES (
        v_autor_id, 2, -- ES
        'Reunião de Colegiado — Planejamento de Estágios e TCCs',
        'Alinhamento com corpo docente sobre cronograma de bancas finais e novos convênios.',
        'Colegiado',
        NOW() - INTERVAL '10 days',
        NOW() - INTERVAL '10 days' + INTERVAL '1 hour 30 minutes',
        'Sala de Reuniões 402 - Bloco B / Híbrido',
        'REALIZADA'
    ) RETURNING id INTO v_r2_id;

    -- Ata da Reunião 2
    INSERT INTO atas (
        reuniao_id, autor_id, pauta_previa, conteudo_realizado, status, versao, arquivo_url, criado_em, publicado_em
    ) VALUES (
        v_r2_id, v_autor_id,
        '1. Cronograma de bancas finais de TCC 2026/1.\n2. Novos convênios de estágio com empresas parceiras do Hub.',
        'Homologou-se o calendário final das apresentações de TCC para a primeira semana de junho. Aprovada a comissão de avaliação com a presença de especialistas externos convidados.',
        'PUBLICADA', 2, '/docs/ata_colegiado_es_tcc_2026.pdf',
        NOW() - INTERVAL '10 days', NOW() - INTERVAL '9 days'
    ) ON CONFLICT (reuniao_id) DO NOTHING;

    -- 3. Reunião Futura Agendada (com Pauta Prévia / Ata Prévia)
    INSERT INTO reunioes (
        organizador_id, curso_id, titulo, descricao, tipo_reuniao,
        data_hora_inicio, data_hora_fim, local_link, status
    ) VALUES (
        v_autor_id, 1, -- ADS
        '5ª Reunião Extraordinária do NDE — Homologação da Prova PAI',
        'Sessão deliberativa para aprovação final do banco de questões multidisciplinares e validação dos distratores.',
        'NDE',
        NOW() + INTERVAL '3 days' + INTERVAL '2 hours',
        NOW() + INTERVAL '3 days' + INTERVAL '4 hours',
        'https://teams.microsoft.com/l/meetup-join/impacta-nde-extraordinaria',
        'AGENDADA'
    ) RETURNING id INTO v_r3_id;

    -- Ata Prévia da Reunião 3
    INSERT INTO atas (
        reuniao_id, autor_id, pauta_previa, conteudo_realizado, status, versao, criado_em
    ) VALUES (
        v_r3_id, v_autor_id,
        '1. Leitura e aprovação da ata da sessão anterior.\n2. Homologação das 10 questões multidisciplinares enviadas pelos docentes.\n3. Definição da comissão de aplicação presencial e virtual.\n4. Assuntos gerais do curso.',
        NULL,
        'RASCUNHO', 1, NOW()
    ) ON CONFLICT (reuniao_id) DO NOTHING;

    -- 4. Reunião Geral de Docentes Agendada
    INSERT INTO reunioes (
        organizador_id, curso_id, titulo, descricao, tipo_reuniao,
        data_hora_inicio, data_hora_fim, local_link, status
    ) VALUES (
        v_autor_id, NULL,
        'Alinhamento Geral de Corpo Docente — Diretrizes Avaliativas AF e AC2',
        'Reunião semestral com todos os professores para orientações de lançamento de notas no portal e atendimento aos alunos.',
        'Geral',
        NOW() + INTERVAL '7 days',
        NOW() + INTERVAL '7 days' + INTERVAL '2 hours',
        'Auditório Principal Impacta / Transmissão Teams',
        'AGENDADA'
    ) RETURNING id INTO v_r4_id;

    -- Ata Prévia da Reunião 4
    INSERT INTO atas (
        reuniao_id, autor_id, pauta_previa, conteudo_realizado, status, versao, criado_em
    ) VALUES (
        v_r4_id, v_autor_id,
        '1. Boas-vindas da Direção Acadêmica e Coordenação Geral.\n2. Prazos regimentais para entrega do diário de classe e faltas.\n3. Cronograma de revisões de notas e atendimento discente.\n4. Capacitação pedagógica sobre metodologias ativas.',
        NULL,
        'RASCUNHO', 1, NOW()
    ) ON CONFLICT (reuniao_id) DO NOTHING;

    -- Participantes
    IF v_r1_id IS NOT NULL AND v_outro_id IS NOT NULL THEN
        INSERT INTO reuniao_participantes (reuniao_id, usuario_id) VALUES
        (v_r1_id, v_autor_id), (v_r1_id, v_outro_id) ON CONFLICT DO NOTHING;
    END IF;

    IF v_r3_id IS NOT NULL AND v_outro_id IS NOT NULL THEN
        INSERT INTO reuniao_participantes (reuniao_id, usuario_id) VALUES
        (v_r3_id, v_autor_id), (v_r3_id, v_outro_id) ON CONFLICT DO NOTHING;
    END IF;

    IF v_r4_id IS NOT NULL AND v_outro_id IS NOT NULL THEN
        INSERT INTO reuniao_participantes (reuniao_id, usuario_id) VALUES
        (v_r4_id, v_autor_id), (v_r4_id, v_outro_id) ON CONFLICT DO NOTHING;
    END IF;
END $$;

