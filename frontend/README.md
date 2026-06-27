# Fonte Tube Frontend

Frontend do projeto Fonte Tube, construído com Vite + React + TypeScript e UI baseada ponta a ponta em shadcn/ui.

## Stack

- Vite 8
- React 19 + React Router
- TypeScript 6
- Tailwind CSS v4 (`@tailwindcss/vite`)
- shadcn/ui (`style: new-york`, CSS variables, aliases `@/*`)
- TanStack Query (remote state and cache)
- Lucide React (icones)
- Next Themes (dark mode)
- Sonner (toasts)

## Como instalar

```bash
pnpm install
```

## Como rodar localmente

```bash
pnpm dev
```

A aplicacao abre em `http://localhost:5173`.

## QA visual local

Depois de iniciar o servidor, verifique:

- Dashboard com hero, metric cards e badge `Supabase` quando as variaveis publicas estiverem configuradas.
- Rotas Biblioteca, Videos, Colecoes, Fontes e Definicoes.
- Sidebar e header em desktop e largura mobile.
- Alternancia de tema claro/escuro.
- Legibilidade dos empty states nos dois temas.

## Scripts

```bash
pnpm dev        # servidor de desenvolvimento
pnpm build      # build de producao
pnpm preview    # preview da build
pnpm lint       # lint do projeto
pnpm typecheck  # checagem de tipos
pnpm check      # lint + typecheck + build
```

## Estrutura de pastas

```text
src/
  app/                 # bootstrap da aplicacao e roteamento
  components/
    ui/                # componentes shadcn/ui gerados pela CLI
    layout/            # shell principal (sidebar/header/theme)
    empty-state.tsx
    page-header.tsx
  features/            # paginas por dominio
  hooks/               # hooks compartilhados
  lib/                 # utilitarios, api local e fronteira Supabase
  styles/              # estilos complementares da aplicacao
  index.css            # Tailwind v4 + tokens de tema
```

## Estado remoto

Use TanStack Query nos arquivos de shell dos módulos:

- `*.queries.ts` para hooks de leitura, como `useItems`.
- `*.mutations.ts` para hooks de escrita, como `useCreateItem`.
- `*.api.ts` como único ponto do módulo que chama Supabase.

Components e páginas devem consumir hooks de módulo, não o client Supabase diretamente.

## Dados e Supabase

O frontend usa Supabase quando as variaveis publicas do Vite estao configuradas. Sem essas variaveis, ele preserva modo mock para desenvolvimento local isolado.

```bash
cp .env.example .env.local
```

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Regras:

- Nunca commitar `.env.local` ou credenciais reais.
- Nunca usar service role key no frontend.
- Usar apenas URL publica e publishable/anon key no browser, configuradas fora do git.
- Manter acesso ao Supabase isolado em `src/lib/supabase/`.
- Manter funcoes de consulta nas camadas `src/lib/api/` e `src/modules/*/*.api.ts`.

## Supabase CLI

Rode comandos Supabase a partir da raiz do repositorio `fonte.bio` e mantenha o working directory como `backend/supabase`.

```bash
supabase link --project-ref lgmwiuxvvapqcrqrcqdf --workdir backend/supabase
pnpm --dir backend/supabase supabase:schema:reset
pnpm --dir backend/supabase supabase:schema:apply
pnpm --dir backend/supabase supabase:generate-types
supabase functions list --project-ref lgmwiuxvvapqcrqrcqdf
```

## shadcn/ui

### Adicionar novos componentes

```bash
pnpm dlx shadcn@latest add <component-name>
```

Exemplo:

```bash
pnpm dlx shadcn@latest add accordion
```

### Configuracao principal

- `components.json`
- `style`: `new-york`
- `cssVariables`: `true`
- `aliases`: `@/*`
- `ui`: `src/components/ui`
- `utils`: `src/lib/utils.ts`

## Convencoes

1. Priorizar componentes shadcn/ui antes de criar componentes visuais proprios.
2. Usar `@/` para imports internos.
3. Preferir composicao de `Card`, `Badge`, `Button`, `Tabs`, `Table`, etc. para manter consistencia visual.
4. Manter dark mode compatível em qualquer nova tela/componente.

## Escopo atual

- Shell inicial com sidebar + header + toggle de tema.
- Paginas base: Dashboard, Biblioteca, Videos, Colecoes, Fontes e Definicoes.
- Supabase de producao aplicado com schema inicial e frontend conectado por URL/chave publica.
