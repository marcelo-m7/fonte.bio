# Fonte.bio Roadmap

This roadmap keeps early work traceable and intentionally staged. Each stage should be delivered through a focused branch and pull request.

## Near-Term PR Stack

1. `chore: establish GitHub workflow and project roadmap` — merged.
2. `feat: prepare Supabase data boundary` — merged; prepares mock/Supabase frontend boundary.
3. `feat: establish end-to-end functional foundation` — adds architecture docs, functional modules, and versioned Supabase structure.
4. `chore: adopt static Supabase schema workflow` — makes fixed SQL schema files the Supabase source of truth and keeps migrations secondary.
5. `feat: integrate production Supabase with frontend` — applies the reviewed baseline remotely and connects frontend reads/writes through typed Supabase APIs.
6. `feat: add TanStack Query module hooks` — adds the remote-state foundation for item, collection, source, and dashboard data.
7. `feat: add Supabase Auth profile foundation` — adds login, signup, session state, and owner-only user profiles.
8. `feat: implement catalog ingestion MVP` — first user-visible source, collection, item, and video catalog workflows.
9. `feat: add ingestion jobs pipeline` — source ingestion jobs and operational statuses.
10. `feat: add item processing Edge Function` — first real Edge Function flow.
11. `feat: add AI enrichment MVP` — AI metadata enrichment with review workflow.

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
- Static schema and RLS workflow notes.
- Derived migration guidance for controlled deployments.

## Etapa 2.5: Static Supabase Schema

Goal: make `backend/supabase/schema/*.sql` the source of truth for database structure before feature data work continues.

PR target: `chore: adopt static Supabase schema workflow`.

Deliverables:

- Ordered fixed SQL schema files.
- Local rebuild/apply/diff/type-generation scripts.
- Documentation for RLS validation and production safety.
- Clear rule that migrations are secondary, generated, or reviewed deploy artifacts.

## Etapa 3: Frontend Shell

Goal: create the base Fonte.bio/Fonte Tube interface shell.

Status: initial shell exists in `frontend/`; future PRs should migrate new domain work into `src/modules/`.

Deliverables:

- Vite + React + TypeScript setup.
- shadcn/ui foundation.
- App shell, navigation, and dark mode.
- Initial empty states.

## Etapa 4: Items MVP

Goal: implement the first useful item catalog workflow.

Status: production Supabase baseline is applied, TanStack Query is active, and Supabase Auth/Profile is the identity foundation for owner-based data. The catalog MVP should make sources, collections, items, and videos usable before deeper ingestion automation.

Deliverables:

- Authenticated user session.
- Owner-only profile record.
- Source registration and source list.
- Collection creation and collection list.
- Item creation and item list.
- Video list derived from cataloged video items.
- Basic filters and status fields in a later follow-up.

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
