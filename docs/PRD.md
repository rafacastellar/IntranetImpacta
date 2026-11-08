# Product Requirement Document (PRD) — Intranet Acadêmica Faculdade Impacta

## 1. Visão Geral e Objetivos do Produto

### 1.1 Visão Geral

Plataforma web intranet responsiva projetada para centralizar, automatizar e estruturar a comunicação e a gestão acadêmica entre professores, coordenação, NDE e secretaria.

### 1.2 Objetivo Geral

Centralizar e automatizar a comunicação interna, otimizar o agendamento de reuniões e o fluxo de atas, garantindo plena conformidade com os requisitos regulatórios do MEC e fornecendo um canal unificado para avisos diários, infraestrutura e políticas institucionais.

### 1.3 Justificativa e Problema Atual

A comunicação atual é descentralizada (fragmentada em e-mails, grupos de WhatsApp e planilhas avulsas), resultando em retrabalho, perda de dados e gargalos operacionais na gestão de atas de NDE e agendamentos.

---

## 2. Público-Alvo e Perfis de Acesso (RBAC)

- **Professores:** Acesso ao mural diário, calendário letivo, avisos de infraestrutura, base de procedimentos e consulta/assinatura de atas.
- **Coordenadores de Curso:** Publicação de avisos segmentados, criação e agendamento de reuniões (NDE e docentes), acompanhamento de confirmação de leitura e gestão de atas.
- **Secretaria da Coordenação:** Operação logística de pautas, convocatórias, upload e organização do repositório de atas.
- **Núcleo Docente Estruturante (NDE):** Gestão dedicada de pautas, atas e registros de conformidade curricular do MEC.
- **Direção Acadêmica e CPA (Comissão Própria de Avaliação):** Perfil de auditoria e acompanhamento de conformidade institucional.

---

## 3. Escopo de Funcionalidades

### 3.1 Gestão de Reuniões e Atas (MEC & NDE)

- **Agendamento Automático:** Integração com serviços de agenda (Google Calendar / Microsoft Outlook) para emissão de convites e lembretes automáticos.
- **Gestão de Pautas e Atas:** Fluxo com criação de pauta prévia, ata da reunião realizada, controle de presença e repositório centralizado com busca por palavra-chave e histórico.

### 3.2 Mural e Calendário Diário

- **Calendário Letivo Operacional:** Visão diária de cronograma, eventos acadêmicos e registros de substituições de aulas.
- **Feed de Avisos & Infraestrutura:** Canal para reportar e consultar incidentes técnicos ou operacionais em salas de aula (ex.: projetores, conectividade) e eventos institucionais.

### 3.3 Canal de Comunicação Segmentado

- **Envio Direcionado:** Publicação de comunicados por curso, departamento ou papel (ex.: exclusivo para NDE de Análise de Sistemas).
- **Confirmação de Leitura:** Painel de controle para a coordenação verificar o engajamento e a recepção das mensagens.

### 3.4 Base de Procedimentos e Políticas Institucionais

- **Repositório Documental:** Central de tutoriais, manuais e guias (solicitação de reembolso, diretrizes da Prova PAI, licenças sabáticas, auxílios e parcerias/benefícios).
- **Mecanismo de Busca:** Motor de busca interno para localização rápida por palavra-chave ou categoria.

---

## 4. Requisitos Não Funcionais e Arquitetura

- **Responsividade (Mobile-First):** Layout 100% otimizado para navegação via dispositivos móveis, prevendo acesso simplificado através de atalhos em grupos de comunicação (ex.: WhatsApp).
- **Autenticação e Segurança:** Login único institucional (SSO), controle de acesso baseado em funções (RBAC) e criptografia de dados em trânsito e em repouso.
- **Integração:** Capacidade de exportação de relatórios estruturados e interoperabilidade com os sistemas acadêmicos vigentes.

---

## 5. Fora de Escopo

- Desenvolvimento de aplicações móveis nativas (iOS / Android) — a solução será uma aplicação Web Responsiva (PWA/Web).
- Módulos de gestão financeira, faturamento, folha de pagamento ou RH.
- Integrações com sistemas externos de terceiros não especificados nos requisitos primários.

---

## 6. Métricas de Sucesso e KPIs

| Indicador                          | Meta                                                                                         |
| :--------------------------------- | :------------------------------------------------------------------------------------------- |
| **Tempo de Agendamento e Atas**    | Redução de **50%** no tempo gasto pela coordenação na operacionalização.                     |
| **Adesão de Docentes**             | Alcance de **80%** de adoção ativa nos primeiros 3 meses pós-lançamento.                     |
| **Erros de Comunicação**           | Redução de **30%** nas falhas relativas a avisos diários e infraestrutura.                   |
| **Satisfação dos Usuários (CSAT)** | Nota média superior a **4,0 / 5,0** em pesquisas periódicas com corpo docente e coordenação. |

---

## 7. Fases do Projeto e Validação

1. **Levantamento e Especificação:** Validação final de regras de negócio junto à coordenação.
2. **Prototipação e UX/UI:** Criação e validação de wireframes e protótipos de alta fidelidade baseados no Design System.
3. **Desenvolvimento Iterativo:** Ciclos de entrega (sprints) quinzenais com demonstrações funcionais.
4. \*\*Testes de Homologação
