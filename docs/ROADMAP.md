# Fonte.bio Roadmap

This roadmap keeps early work traceable and intentionally staged. Each stage should be delivered through a focused branch and pull request.

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

Deliverables:

- Confirm folder layout.
- Define package manager conventions.
- Add baseline local development commands.
- Document ownership and boundaries.

## Etapa 2: Supabase Base

Goal: prepare Supabase integration without leaking secrets or coupling UI directly to database schemas.

Deliverables:

- `.env.example` with public variable names only.
- Supabase client boundary.
- Initial database contracts.
- Migration and RLS workflow notes.

## Etapa 3: Frontend Shell

Goal: create the base Fonte.bio/Fonte Tube interface shell.

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
