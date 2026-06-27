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

## Pull Requests

Each PR should be small and reviewable. Include:

- Scope of the change.
- Commands/checks executed.
- Screenshots for UI changes.
- Environment variables added or changed.
- Migration and RLS notes for Supabase changes.

## Reference Policy

Do not copy FACODI-specific patterns into this repository. When a technical reference is needed, inspect only `marcelo-m7/tube-o2` on branch `facodi` and adapt deliberately for Fonte.bio.

## Documentation

Follow the official workflow in [docs/WORKFLOW.md](docs/WORKFLOW.md). Keep [docs/ROADMAP.md](docs/ROADMAP.md) updated when project stages change.
