# AGENTS.md

Guidance for AI coding agents working in this repository.

## Start Here

- Read [README.md](README.md) for the current project shape.
- Use [docs/WORKFLOW.md](docs/WORKFLOW.md) as the canonical branch/commit/PR policy.
- Use [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for module boundaries and Functional Core / Imperative Shell rules.
- Use [docs/SUPABASE.md](docs/SUPABASE.md) for schema workflow, local commands, and production safety.
- Check [docs/ROADMAP.md](docs/ROADMAP.md) before changing project stage assumptions.

## Core Rules

- Never work directly on `main`.
- Start every implementation or documentation step from a focused branch off `main`.
- Keep changes small, traceable, and PR-sized.
- Use conventional commit messages.
- Open a pull request for every meaningful step.
- Explain implementation decisions and trade-offs in the PR description.
- Run the nearest available checks before finalizing work.

## Repository Map

```text
backend/supabase/      Supabase config, schema source of truth, functions
frontend/              Vite + React + TypeScript frontend
docs/                  Workflow, architecture, roadmap, and Supabase notes
```

## Build And Validation

Run commands from repository root unless a doc says otherwise.

Frontend checks:

```bash
cd frontend
pnpm install
pnpm check
```

Frontend dev server:

```bash
cd frontend
pnpm dev
```

Visual QA targets for frontend work:

- Dashboard
- Biblioteca
- Videos
- Colecoes
- Fontes
- Definicoes
- Light and dark mode
- Desktop and mobile widths

Supabase local commands:

```bash
supabase start --workdir backend/supabase
pnpm --dir backend/supabase supabase:schema:reset
pnpm --dir backend/supabase supabase:schema:apply
pnpm --dir backend/supabase supabase:schema:diff
```

## Architecture Boundaries

- Frontend code lives in `frontend/`.
- New domain work should prefer `src/modules/<domain>/` over flat page-level logic.
- Keep `*.logic.ts` files pure: no React, Supabase client, browser globals, network calls, storage, or side effects.
- Keep `*.api.ts`, `*.queries.ts`, `*.mutations.ts`, Edge Functions, auth, uploads, and redirects in the imperative shell.
- Do not introduce architecture boilerplate without concrete responsibility.

## Supabase Schema Workflow

- Treat `backend/supabase/schema/*.sql` as the database source of truth.
- Start every structural database change in the fixed schema files.
- Keep `backend/supabase/migrations/` secondary; migrations are generated or reviewed deployment artifacts only.
- Do not manually edit migrations as the primary design surface.
- Preserve `backend/supabase/migrations/.gitkeep` when no migrations exist.
- GitHub Supabase integration uses `backend` as the working directory.
- Do not run destructive remote Supabase commands from agent automation.
- Local resets are allowed only for disposable local databases.
- Document RLS validation for any table, policy, or storage access change.

## Pull Request Expectations

Each PR should stay small and reviewable. Include:

- Scope of the change.
- Commands/checks executed.
- Screenshots for UI changes.
- Environment variables added or changed.
- Static schema, derived migration, and RLS notes for Supabase changes.

## Secrets And Credentials

Never commit secrets, including:

- Real `.env` files.
- Supabase service role keys.
- API tokens.
- Personal credentials.
- Production credentials.

Use `.env.example` only for documenting variable names. Frontend code may use only public Vite variables such as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## Branch Hygiene

- Delete only local branches that are clearly obsolete.
- Never delete remote branches from agent automation.
- Do not delete branches with unmerged or ambiguous work unless the user explicitly confirms.
- When PRs were squash-merged, compare branch content against `main` before local cleanup.

## Reference Policy

Do not copy FACODI-specific patterns into this repository. When a technical reference is needed, inspect only `marcelo-m7/tube-o2` on branch `facodi` and adapt deliberately for Fonte.bio.
