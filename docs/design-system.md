# Design System - Faculdade Impacta

## 1. Tipografia

### Famílias Tipográficas

- **Fonte Principal (Títulos e Destaques):** `Montserrat`, sans-serif
  - **Pesos:** Regular (`400`), Bold (`700`)
- **Fonte Secundária / Fallback:** `Arial`, `Helvetica`, `sans-serif`
- **Ícones:** FontAwesome (Classe base `.fa`)

### Padrões de Uso

- **Títulos (`.main_title`):** Montserrat, peso Bold (`700`), alinhamento e espaçamentos estruturados.
- **Corpo de Texto:** Montserrat / Arial, peso Regular (`400`).

---

## 2. Paleta de Cores

### Cores Institucionais e Primárias

| Aplicação                | Códigos Hex                                           | Função / Contexto                                                          |
| :----------------------- | :---------------------------------------------------- | :------------------------------------------------------------------------- |
| **Escuro Institucional** | `#0b2b38`, `#071c23`, `#050e10`, `#0d181d`            | Fundos de seções, cabeçalhos e blocos de alto impacto visual.              |
| **Azul Destaque**        | `#007eb1`, `#0555d0`, `#0a88f4`, `#116fff`, `#2699ff` | Links, botões de ação (`.btn-primary`), estados de hover e interatividade. |
| **Ciano Técnico**        | `#00d8ff`                                             | Highlights secundários, elementos de tecnologia e acentos gráficos.        |
| **Roxo Institucional**   | `#7d498a`, `#7c4a8a`, `#503873`                       | Destaques secundários e marcas institucionais complementares.              |

### Cores Neutras e Texto

| Aplicação                  | Códigos Hex                                           | Função / Contexto                                         |
| :------------------------- | :---------------------------------------------------- | :-------------------------------------------------------- |
| **Branco / Fundos Claros** | `#ffffff`, `#fefefe`, `#ececec`, `#e2e2e2`            | Fundo principal da página, áreas de conteúdo e cards.     |
| **Cinzas Médios**          | `#ccc`, `#9c9c9c`, `#8c9092`, `#869791`, `#555555`    | Bordas, divisores, ícones e texto secundário.             |
| **Texto Escuro**           | `#000000`, `#111111`, `#101010`, `#00050b`, `#333333` | Leitura principal, títulos e elementos de alto contraste. |

### Cores de Feedback

- **Sucesso / Confirmação:** `#4dc247`
- **Erro / Alerta:** `#f44336`

---

## 3. Layout e Espaçamento

### Estrutura de Grelha e Conteúdo

- **Container:** `.container` (centralização e limitação de largura de conteúdo).
- **Sistema de Colunas / Blocos:**
  - `.box` — Bloco estrutural genérico de layout.
  - `.box-3` — Grade de 3 colunas / largura proporcional.
  - `.box-6` — Grade de 6 colunas / meia largura.

### Alinhamento e Espaçamento Vertical

- **Alinhamento de Texto:**
  - `.text-left` — Alinhamento à esquerda.
  - `.text-center` — Alinhamento centralizado.
- **Espaçamento (Margens Verticais):**
  - `.margin-top-25` — Margem superior de 25px.
  - `.margin-top-50` — Margem superior de 50px.

---

## 4. Componentes UI

### Botões e Chamadas de Ação (CTA)

- **`.btn-primary`**: Botão de ação principal, estilizado nas tonalidades de azul destaque, com tipografia em negrito.

### Listas e Navegação

- **`.ul-none`**: Remoção de marcadores padrão HTML e paddings para menus e grelhas de cartões.

### Componentes Multimídia e Carrosséis

- **Sliders Interativos:**
  - `.slick-slide`, `.slick-active`, `.slick-arrow`, `.slick-list` (Slick Slider)
  - `.owl-item`, `.owl-dot` (Owl Carousel)
- **Mídia Incorporada:**
  - `.videoyt` — Contentor responsivo para vídeos do YouTube.

---

## 5. Animações e Utilitários

### Animações CSS

- **Classes de Transição:** `.animated`, `.wow`, `.fadeInRight` (animação de entrada lateral suave ao rolar a página).

### Visibilidade e Auxiliares

- **`.sf-hidden`**: Ocultação de elementos no fluxo DOM.
- **`.content-short`**: Exibição simplificada/resumida de blocos textuais.
