-- Seed de Documentos e Políticas Institucionais (Módulo 5)
-- Tutoriais, Procedimentos, Normas MEC, Benefícios e Diretrizes Acadêmicas

DO $$
DECLARE
    v_autor_id UUID;
BEGIN
    -- Seleciona um usuário padrão institucional como autor
    SELECT id INTO v_autor_id FROM usuarios WHERE email = 'carlos.silveira@impacta.edu.br' LIMIT 1;
    IF v_autor_id IS NULL THEN
        SELECT id INTO v_autor_id FROM usuarios LIMIT 1;
    END IF;

    -- Inserção dos documentos e tutoriais institucionais
    INSERT INTO documentos_politicas (
        autor_id,
        categoria_id,
        titulo,
        resumo,
        conteudo_html,
        arquivo_url,
        palavras_chave,
        ativo
    ) VALUES
    (
        v_autor_id,
        2, -- Procedimentos Docentes
        'Manual de Solicitação de Reembolso de Despesas Docentes e Eventos',
        'Passo a passo com formulários e comprovantes exigidos pela controladoria para ressarcimento de inscrições em congressos, viagens acadêmicas e publicações científicas.',
        '<h3>1. Objetivo e Escopo</h3><p>Este procedimento estabelece as diretrizes institucionais para concessão e ressarcimento de despesas decorrentes de viagens a serviço, inscrições em simpósios/congressos acadêmicos e publicações científicas.</p><h3>2. Prazos Regimentais</h3><ul><li>A solicitação deve ser protocolada em até <strong>15 dias corridos</strong> após a realização do evento ou despesa.</li><li>O prazo padrão de liquidação bancária pela Controladoria é de até 10 dias úteis após validação da prestação de contas.</li></ul><h3>3. Documentos Exigidos</h3><ol><li>Formulário de Prestação de Contas preenchido e assinado digitalmente.</li><li>Notas Fiscais originais emitidas com CNPJ da mantenedora ou comprovantes com CPF do docente.</li><li>Certificado de participação ou comprovante de apresentação de trabalho/artigo aceito.</li></ol><h3>4. Fluxo de Aprovação</h3><p>O processo deve ser submetido via sistema, passando pela prévia concordância da Coordenação de Curso e homologação da Direção Acadêmica.</p>',
        '/docs/manual_reembolso_docentes_impacta.pdf',
        ARRAY['reembolso', 'despesas', 'viagem', 'congresso', 'financeiro', 'publicação', 'controladoria', 'prestação de contas'],
        true
    ),
    (
        v_autor_id,
        4, -- Acadêmico
        'Guia de Diretrizes para Avaliações PAI (Prova de Avaliação Integrada)',
        'Instruções sobre matriz de competências, critérios de elaboração de questões multidisciplinares e cronograma de envio das questões para validação pelo NDE.',
        '<h3>1. Apresentação da Prova PAI</h3><p>A Prova de Avaliação Integrada (PAI) é uma avaliação multidisciplinar semestral concebida para mensurar o desenvolvimento das competências e habilidades descritas nos Projetos Pedagógicos de Curso (PPC).</p><h3>2. Formatação das Questões</h3><ul><li>Cada docente responsável deve elaborar <strong>10 questões inéditas</strong> no padrão ENADE (situação-problema contextualizada, comando claro e 5 alternativas com apenas 1 correta).</li><li>Justificativa fundamentada do gabarito para todos os distratores.</li></ul><h3>3. Calendário de Submissão e Validação</h3><p>O envio das questões deve ser feito até a 6ª semana do semestre letivo. O NDE realiza a revisão por pares e banca técnica em até 10 dias úteis antes da diagramação final.</p>',
        '/docs/guia_diretrizes_prova_pai_impacta.pdf',
        ARRAY['pai', 'avaliação integrada', 'provas', 'enade', 'nde', 'competências', 'questões', 'banca'],
        true
    ),
    (
        v_autor_id,
        3, -- Benefícios
        'Regulamento de Licença Sabática e Afastamento para Pós-Graduação',
        'Normas e critérios de elegibilidade para solicitação de dedicação exclusiva e períodos de pesquisa para docentes em programas de mestrado, doutorado e pós-doutorado.',
        '<h3>1. Elegibilidade e Condições</h3><p>A concessão de Licença Sabática destina-se a docentes estáveis com pelo menos <strong>3 anos ininterruptos</strong> de dedicação ao corpo docente da Faculdade Impacta, admitidos em programas de pós-graduação stricto sensu reconhecidos pela CAPES/MEC.</p><h3>2. Duração e Benefícios Mantidos</h3><ul><li>Afastamento parcial (redução de carga horária em até 50%) ou integral (período de 6 a 12 meses renovável por igual período).</li><li>Manutenção de plano de saúde institucional e pontuação funcional na carreira docente.</li></ul><h3>3. Contrapartida Institucional</h3><p>O docente beneficiado compromete-se a permanecer no quadro acadêmico por período no mínimo equivalente ao tempo de usufruto da licença e a submeter artigos científicos vinculados à filiação da Impacta.</p>',
        '/docs/regulamento_licenca_sabatica_doutorado.pdf',
        ARRAY['licença', 'sabática', 'doutorado', 'mestrado', 'pesquisa', 'afastamento', 'pós-graduação', 'capes', 'benefícios'],
        true
    ),
    (
        v_autor_id,
        3, -- Benefícios
        'Programa de Bolsas de Estudos e Convênios Corporativos (Sesc & Hub Academia)',
        'Política institucional de concessão de bolsas para graduação/pós-graduação para dependentes, além de acesso à rede credenciada Sesc e convênio Hub Academia.',
        '<h3>1. Bolsa de Estudos para Docentes e Dependentes</h3><p>A instituição assegura incentivo à qualificação continuada com descontos de <strong>até 100%</strong> em cursos de graduação e pós-graduação lato sensu ministrados pela Faculdade Impacta para titulares e cônjuges/filhos dependentes.</p><h3>2. Convênio Sesc São Paulo</h3><ul><li>Credenciamento pleno na categoria Conveniado/Serviços.</li><li>Acesso a centros culturais, hospedagem de férias, odontologia e áreas esportivas em todas as unidades Sesc.</li></ul><h3>3. Hub Academia & Bem-Estar</h3><p>Subsídio mensal para matrículas e planos corporativos na rede credenciada do Hub Academia, com check-in facilitado via aplicativo e débito com desconto em folha de pagamento.</p>',
        '/docs/guia_bolsas_e_convenios_sesc_hub.pdf',
        ARRAY['bolsa de estudos', 'benefícios', 'sesc', 'hub academia', 'convênios', 'descontos', 'dependentes', 'bem-estar', 'academia'],
        true
    ),
    (
        v_autor_id,
        1, -- Normas MEC
        'Manual de Conformidade Regulatória e Instrumento de Avaliação do MEC',
        'Referencial com os indicadores das dimensões de corpo docente, infraestrutura e organização didático-pedagógica para reconhecimento e renovação de cursos.',
        '<h3>1. Dimensão Docente no Instrumento MEC</h3><p>Compêndio dos indicadores avaliativos do INEP/MEC com foco na Dimensão 2 (Corpo Docente e Tutorial): regime de trabalho (tempo integral/parcial), titulação (percentual de mestres e doutores), produção acadêmica e atuação no NDE.</p><h3>2. Portarias e Prazos do Censo da Educação Superior</h3><p>Orientações para atualização tempestiva do currículo Lattes, portarias de designação e registros de formação continuada para atendimento a auditorias in loco e virtuais.</p>',
        '/docs/manual_conformidade_regulatoria_mec.pdf',
        ARRAY['mec', 'regulação', 'nde', 'conformidade', 'inep', 'censo', 'avaliação institucional', 'portarias'],
        true
    ),
    (
        v_autor_id,
        2, -- Procedimentos Docentes
        'Diretrizes e Prazos para Lançamento de Frequência e Notas no Portal Acadêmico',
        'Procedimento operacional padrão para diário de classe eletrônico, registro quinzenal de presenças e prazos regimentais para digitação de notas AC1, AC2 e AF.',
        '<h3>1. Diário de Classe Eletrônico</h3><p>O registro de presenças e faltas deve ser atualizado quinzenalmente no Portal do Professor. A tolerância regimental de faltas para aprovação é de no máximo 25% da carga horária semestral.</p><h3>2. Prazos de Avaliações e Provas</h3><ul><li><strong>AC1 e AC2:</strong> lançamento das notas em até 7 dias úteis após a aplicação.</li><li><strong>Avaliação Final (AF):</strong> digitação e encerramento no prazo estipulado no Calendário Acadêmico Oficial.</li><li><strong>Revisão de Provas:</strong> atendimento ao discente mediante requerimento protocolado na Secretaria em até 48 horas.</li></ul>',
        '/docs/pop_fechamento_notas_frequencia.pdf',
        ARRAY['notas', 'faltas', 'diário de classe', 'portal acadêmico', 'frequência', 'prazos', 'provas', 'procedimentos'],
        true
    )
    ON CONFLICT DO NOTHING;
END $$;

