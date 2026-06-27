# Fonte Tube Frontend

Frontend do projeto Fonte Tube, construído com Vite + React + TypeScript e UI baseada ponta a ponta em shadcn/ui.

## Stack

- Vite 8
- React 19 + React Router
- TypeScript 6
- Tailwind CSS v4 (`@tailwindcss/vite`)
- shadcn/ui (`style: new-york`, CSS variables, aliases `@/*`)
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

## Scripts

```bash
pnpm dev        # servidor de desenvolvimento
pnpm build      # build de producao
pnpm preview    # preview da build
pnpm lint       # lint do projeto
pnpm typecheck  # checagem de tipos
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
  lib/                 # utilitarios (ex.: cn)
  styles/              # estilos complementares da aplicacao
  index.css            # Tailwind v4 + tokens de tema
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
- Sem integracao real com backend/Supabase nesta fase.
