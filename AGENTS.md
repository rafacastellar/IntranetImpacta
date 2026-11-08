## Project Configuration

- **Language**: TypeScript
- **Package Manager**: npm
- **Add-ons**: tailwindcss

---

# Diretrizes de Desenvolvimento (Antigravity Agent)

## 1. Stack Tecnológica

- **Framework:** SvelteKit (Svelte 5 com Runes, TypeScript)
- **Estilização:** Tailwind CSS (Mobile-First, modo escuro/claro)
- **Backend & Banco de Dados:** Supabase (PostgreSQL, Supabase Auth, Row Level Security, Storage)
- **Ícones:** Lucide-Svelte

---

## 2. Regras de Código Svelte 5 & TypeScript

1. **TypeScript Estrito:** Todo o código deve ser fortemente tipado. Os tipos do Supabase devem ser gerados e importados de `$lib/types/supabase.ts`.
2. **Uso Exclusivo de Svelte 5 Runes:** Utilize `$props()`, `$state()`, `$derived()`, `$effect()` e snippet props. É proibido usar sintaxe legada do Svelte 3/4 (`export let`, `$:`, `createEventDispatcher`).
3. **Arquitetura SvelteKit:** Prefira Server Load Functions (`+page.server.ts`) e Form Actions para manipulação de dados sensíveis e rotas protegidas.
4. **Gerenciamento de Sessão SSR:** Utilize a biblioteca `@supabase/ssr` no lado do servidor (`src/hooks.server.ts`) para validar sessões e disponibilizar o cliente Supabase no contexto da aplicação.

---

## 3. Diretrizes de UI/UX e Responsividade

- **Fidelidade ao Design System:** Siga estritamente as especificações e a paleta definidas em `docs/design-system.md`.
- **Mobile-First Real:** Garanta que 100% das telas sejam funcionais em smartphones, priorizando o acesso rápido dos professores.
- **Tabelas Responsivas:** Toda tabela de dados complexa deve possuir um layout alternativo em formato de "Cards" visível em telas mobile (`block md:hidden`).
- **Estados da Interface:** Implemente estados de carregamento (skeletons) e tratamento amigável de erros de validação em todos os formulários.

---

## 4. Estratégia de Estilização e CSS Global

- **Proibição de Estilos Inline:** É estritamente proibido usar a propriedade `style="..."` em elementos HTML/Svelte.
- **Integração Tailwind + Design Tokens:** Os tokens de cores e fonte descritos em `design-system.md` devem ser declarados no `src/app.css` (via `@theme` ou variáveis CSS `:root`).
- **Proibição de Hexadecimal Arbitrário:** Não utilize cores hardcoded em classes do Tailwind (ex: evite `bg-[#0b2b38]`). Utilize sempre as classes do tema configurado ou variáveis CSS (ex: `bg-brand-dark` ou `var(--color-brand-dark)`).

---

## 5. Componentização e Organização ($lib)

- **Princípio de Granularidade:**
  - `$lib/components/ui/`: Componentes primitivos, agnósticos de regra de negócio (Botões, Modais, Inputs, Badges, Skeletons). - `$lib/components/features/`: Componentes de domínio de negócio (ex: `AtaEditor`, `MuralDiario`, `ReuniaoScheduler`).
- **Responsabilidade Única:** Cada componente deve residir em seu próprio arquivo `.svelte`. Componentes com mais de 150 linhas de código devem ser refatorados em subcomponentes menores.

---

## 6. Estrutura de Diretórios Oficial (Padrão SvelteKit)

src/
├── app.css # Import do Tailwind, Reset CSS e Variáveis Globais de Design
├── app.d.ts # Declarações de tipos globais e App.Locals (Supabase Auth)
├── hooks.server.ts # Cliente Supabase SSR, gestão de cookies e sessão
├── lib/
│ ├── components/
│ │ ├── ui/ # Componentes genéricos de UI (Button, Modal, Input, Card)
│ │ └── features/ # Componentes com regra de negócio (Mural, RepositorioAtas, Agendamento)
│ ├── server/ # Código restrito ao servidor (DB queries privadas, helpers)
│ ├── types/ # Tipos TypeScript e definições do Supabase (supabase.ts)
│ └── utils/ # Funções utilitárias e formatadores de data/texto
└── routes/ # Roteamento baseado no sistema de arquivos do SvelteKit
├── +layout.server.ts
├── +layout.svelte
├── +page.svelte
└── (app)/ # Grupos de rotas autenticadas da intranet

---

## 7. Segurança e Banco de Dados (Supabase)

- **Row Level Security (RLS):** Toda tabela criada no PostgreSQL deve ter RLS ativado e políticas configuradas por perfil de acesso (Professor, Coordenador, Secretaria, NDE).
- **Proteção de Credenciais:** A chave `service_role` NUNCA deve ser exposta no código do cliente (`$lib/` público ou componentes). Operações administrativas devem rodar exclusivamente em arquivos `+page.server.ts` ou `$lib/server/`.

### 7.1 Alterações de Banco de Dados e Schemas

- **Nunca edite tabelas existentes diretamente em produção sem migração:** Qualquer alteração no banco (novo campo, nova tabela ou ajuste de RLS) deve ser gerada como um script SQL incremental dentro de `supabase/migrations/`.
- **Sincronização de Tipos:** Após alterar qualquer estrutura de tabela no SQL, execute a atualização de tipos (`npx supabase gen types typescript`) para manter `$lib/types/supabase.ts` sincronizado com o banco.
- **Políticas RLS Obrigatórias:** Todo comando `CREATE TABLE` deve ser acompanhado de `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;` e das suas respectivas `CREATE POLICY`.

---

## 8. Workflow do Agente Antigravity

- **Checagem Prévia de Contexto:** Antes de implementar uma funcionalidade ou refatoração, consulte `docs/prd.md` para entender as regras de negócio e `docs/design-system.md` para o padrão visual.
- **Validação:** Sempre certifique-se de que o código passa no compilador de tipos do TypeScript antes de concluir as alterações.
