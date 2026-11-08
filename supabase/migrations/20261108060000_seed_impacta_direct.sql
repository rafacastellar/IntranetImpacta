-- Seed para Módulo 4: Impacta Direct (Comunicação Segmentada & Confirmação de Leitura)

DO $$
DECLARE
    v_autor_id UUID;
    v_outro_id UUID;
    v_comm1_id BIGINT;
    v_comm2_id BIGINT;
    v_comm3_id BIGINT;
BEGIN
    -- Seleciona os usuários padrão
    SELECT id INTO v_autor_id FROM usuarios WHERE email = 'carlos.silveira@impacta.edu.br' LIMIT 1;
    IF v_autor_id IS NULL THEN
        SELECT id INTO v_autor_id FROM usuarios LIMIT 1;
    END IF;

    SELECT id INTO v_outro_id FROM usuarios WHERE email = 'edsoncosta@impacta.edu.br' LIMIT 1;
    IF v_outro_id IS NULL THEN
        v_outro_id := v_autor_id;
    END IF;

    -- Cadastra turmas caso não existam
    INSERT INTO turmas (curso_id, codigo, semestre_letivo, turno, ativo) VALUES
    (1, 'ADS-3A-M', '2026/1', 'MANHÃ', true),
    (1, 'ADS-4B-N', '2026/1', 'NOITE', true),
    (2, 'ES-2A-M', '2026/1', 'MANHÃ', true)
    ON CONFLICT (codigo) DO NOTHING;

    -- 1. Comunicado direcionado ao NDE
    INSERT INTO comunicados_direcionados (
        remetente_id,
        perfil_id_alvo,
        alvo_tipo,
        titulo,
        mensagem,
        data_envio
    ) VALUES (
        v_autor_id,
        4, -- NDE
        'PERFIL',
        'Convocação: Reunião Extraordinária do NDE — Validação das Questões da Prova PAI',
        'Prezados membros do Núcleo Docente Estruturante, convocamos todos para sessão extraordinária na próxima terça-feira às 14h30 via Teams. Pauta única: homologação das questões multidisciplinares da PAI 2026/1.',
        NOW() - INTERVAL '2 days'
    ) RETURNING id INTO v_comm1_id;

    -- 2. Comunicado direcionado aos docentes do Curso de ADS
    INSERT INTO comunicados_direcionados (
        remetente_id,
        curso_id_alvo,
        alvo_tipo,
        titulo,
        mensagem,
        data_envio
    ) VALUES (
        v_autor_id,
        1, -- ADS
        'CURSO',
        'Alinhamento de Laboratórios e Entregas do Projeto Integrador (ADS)',
        'Professores de ADS: favor orientar os grupos sobre a reserva antecipada dos Laboratórios 302 e 304 para as bancas de defesa. Os critérios de avaliação já estão disponíveis na Base de Procedimentos.',
        NOW() - INTERVAL '1 day'
    ) RETURNING id INTO v_comm2_id;

    -- 3. Comunicado geral a Todos os Docentes
    INSERT INTO comunicados_direcionados (
        remetente_id,
        alvo_tipo,
        titulo,
        mensagem,
        data_envio
    ) VALUES (
        v_autor_id,
        'TODOS',
        'Lembrete Institucional: Prazo de Fechamento de Frequência Quinzenal',
        'Lembramos que o fechamento quinzenal de presença e faltas no Portal Acadêmico encerra-se nesta sexta-feira às 23h59. A regularidade do diário é essencial para conformidade com as diretrizes do MEC.',
        NOW() - INTERVAL '5 hours'
    ) RETURNING id INTO v_comm3_id;

    -- Confirmação de Leitura de Demonstração
    IF v_comm1_id IS NOT NULL AND v_outro_id IS NOT NULL THEN
        INSERT INTO comunicado_leituras (comunicado_id, usuario_id, lido_em)
        VALUES (v_comm1_id, v_outro_id, NOW() - INTERVAL '1 day')
        ON CONFLICT (comunicado_id, usuario_id) DO NOTHING;
    END IF;

    IF v_comm2_id IS NOT NULL AND v_outro_id IS NOT NULL THEN
        INSERT INTO comunicado_leituras (comunicado_id, usuario_id, lido_em)
        VALUES (v_comm2_id, v_outro_id, NOW() - INTERVAL '12 hours')
        ON CONFLICT (comunicado_id, usuario_id) DO NOTHING;
    END IF;
END $$;

