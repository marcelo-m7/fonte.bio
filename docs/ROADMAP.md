# Fonte.bio Roadmap

This roadmap keeps early work traceable and intentionally staged. Each stage should be delivered through a focused branch and pull request.

## Near-Term PR Stack

1. `chore: establish GitHub workflow and project roadmap` — merged.
2. `feat: prepare Supabase data boundary` — merged; prepares mock/Supabase frontend boundary.
3. `feat: establish end-to-end functional foundation` — adds architecture docs, functional modules, and versioned Supabase structure.
4. `feat: add initial Supabase schema migrations` — creates first public/private tables and RLS policies.
5. `feat: connect items module to Supabase` — replaces item shell APIs with typed Supabase queries.
6. `feat: implement item creation and listing` — first user-visible item workflow.
7. `feat: add ingestion jobs pipeline` — source ingestion jobs and operational statuses.
8. `feat: add item processing Edge Function` — first real Edge Function flow.
9. `feat: add AI enrichment MVP` — AI metadata enrichment with review workflow.

## Etapa 0: GitHub Workflow

Goal: establish branch, commit, issue, and pull request conventions before product implementation continues.

Deliverables:

- Workflow documentation.
- Agent instructions.
- Pull request template.
- Feature request issue template.
- Initial roadmap.

## Etapa 1: Monorepo Base

Goal: define the repository shape for frontend, backend-adjacent assets, docs, and future packages.

PR target: `feat: establish end-to-end functional foundation`.

Deliverables:

- Confirm folder layout.
- Define package manager conventions.
- Add baseline local development commands.
- Document ownership and boundaries.

## Etapa 2: Supabase Base

Goal: prepare Supabase integration without leaking secrets or coupling UI directly to database schemas.

PR target: `feat: prepare Supabase data boundary` plus the stacked E2E foundation PR.

Deliverables:

- `.env.example` with public variable names only.
- Supabase client boundary.
- Initial database contracts.
- Migration and RLS workflow notes.

## Etapa 3: Frontend Shell

Goal: create the base Fonte.bio/Fonte Tube interface shell.

Status: initial shell exists in `fonte.tube/frontend`; future PRs should migrate new domain work into `src/modules/`.

Deliverables:

- Vite + React + TypeScript setup.
- shadcn/ui foundation.
- App shell, navigation, and dark mode.
- Initial empty states.

## Etapa 4: Items MVP

Goal: implement the first useful item catalog workflow.

Deliverables:

- Item list.
- Item detail view.
- Create/edit forms.
- Basic filters and status fields.

## Etapa 5: Ingestion Pipeline

Goal: define the pipeline for bringing external videos, links, and sources into the structured catalog.

Deliverables:

- Source registration flow.
- Ingestion status model.
- Manual import MVP.
- Error and retry states.

## Etapa 6: AI Enrichment

Goal: add AI-assisted metadata, summaries, tagging, and knowledge structuring after data foundations are stable.

Deliverables:

- Enrichment job model.
- Human review workflow.
- Prompt/version traceability.
- Audit notes for generated metadata.
