# Fonte.bio

Fonte.bio is being built through small, traceable pull requests before broad feature implementation.

## Current Project Shape

```text
backend/
  supabase/        # static Supabase schema source of truth, config, and Edge Functions
frontend/          # Vite + React + TypeScript + shadcn/ui frontend
docs/              # workflow, architecture, roadmap, and Supabase notes
```

## Workflow

- Do not work directly on `main`.
- Create a focused branch for every meaningful step.
- Use conventional commits.
- Open a pull request for each step.
- Keep PRs small enough to review.
- Never commit secrets, real `.env` files, Supabase service role keys, tokens, or credentials.

See [docs/WORKFLOW.md](docs/WORKFLOW.md) for the official workflow.

## Local Health Check

Frontend checks:

```bash
cd frontend
pnpm install
pnpm check
```

`pnpm check` runs lint, typecheck, and production build.

## Visual QA

When the frontend changes, run:

```bash
cd frontend
pnpm dev
```

Then verify:

- Dashboard renders with the Fonte Tube hero and metric cards.
- Biblioteca, Videos, Colecoes, Fontes, and Definicoes routes render.
- Sidebar/header layout remains usable on desktop and mobile widths.
- Dark mode applies through the theme toggle.
- Empty states remain readable in light and dark mode.

## Supabase

Supabase source is versioned under [backend/supabase](backend/supabase). The fixed SQL schema in [backend/supabase/schema](backend/supabase/schema) is the source of truth. The Supabase GitHub integration should use `backend` as the working directory.

See [docs/SUPABASE.md](docs/SUPABASE.md) for project ref, commands, and secret-handling rules.
