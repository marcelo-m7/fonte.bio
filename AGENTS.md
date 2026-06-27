# AGENTS.md

Guidance for AI coding agents working in this repository.

## Core Rules

- Never work directly on `main`.
- Start every implementation or documentation step by creating a focused branch from `main`.
- Keep changes small and traceable.
- Use conventional commit messages.
- Open a pull request for every meaningful step.
- Explain implementation decisions and trade-offs in the PR description.
- Run available checks before finalizing work.

## Secrets And Credentials

Never commit secrets, including:

- Real `.env` files.
- Supabase service role keys.
- API tokens.
- Personal credentials.
- Production credentials.

Use `.env.example` only for documenting variable names.

## Branching

Use short-lived branches:

```text
<type>/<short-scope>
```

Examples:

```text
chore/github-pr-workflow
feat/frontend-shell
feat/supabase-base
```

## Branch Hygiene

- Delete only local branches that are clearly obsolete.
- Never delete remote branches from agent automation.
- Do not delete branches with unmerged or ambiguous work unless the user explicitly confirms.
- When PRs were squash-merged, compare branch content against `main` before local cleanup.

## Pull Requests

Each PR should be small and reviewable. Include:

- Scope of the change.
- Commands/checks executed.
- Screenshots for UI changes.
- Environment variables added or changed.
- Migration and RLS notes for Supabase changes.

## Validation

For frontend changes, run the available checks from `fonte.tube/frontend`:

```bash
pnpm check
```

For UI changes, also run the app and verify the main routes visually:

- Dashboard
- Biblioteca
- Videos
- Colecoes
- Fontes
- Definicoes
- Light and dark mode
- Desktop and mobile widths

## Reference Policy

Do not copy FACODI-specific patterns into this repository. When a technical reference is needed, inspect only `marcelo-m7/tube-o2` on branch `facodi` and adapt deliberately for Fonte.bio.

## Documentation

Follow the official workflow in [docs/WORKFLOW.md](docs/WORKFLOW.md). Keep [docs/ROADMAP.md](docs/ROADMAP.md) updated when project stages change.
