# Fonte.bio Architecture

Fonte.bio evolves through small pull requests with a simple functional modular architecture. The goal is to keep product code easy to reason about while still supporting a full end-to-end path from frontend interactions to Supabase-backed data and Edge Functions.

## Current Base

This branch is stacked on top of PR #2, `feat: prepare Supabase data boundary`, because the end-to-end foundation depends on the frontend mock/Supabase boundary introduced there.

## Frontend Organization

The frontend lives in `frontend/` at the repository root.

The target structure is intentionally simpler than pure Feature-Sliced Design:

```text
src/
  app/
  pages/
  modules/
    item/
    collection/
    source/
    profile/
    search/
    timeline/
  shared/
    api/
    config/
    hooks/
    lib/
    ui/
    types/
```

Existing code can migrate gradually. New domain work should prefer `src/modules/<domain>/`.

## Module Shape

Each module can expose these files when useful:

```text
modules/<domain>/
  <domain>.types.ts
  <domain>.schema.ts
  <domain>.logic.ts
  <domain>.api.ts
  <domain>.keys.ts
  <domain>.queries.ts
  <domain>.mutations.ts
  components/
  index.ts
```

Only create files that carry real responsibility. Avoid empty architecture theater.

## Functional Core / Imperative Shell

Fonte.bio uses Functional Core / Imperative Shell.

### Functional Core

Functional core files use the `*.logic.ts` suffix.

Rules:

- Pure functions only.
- No React.
- No Supabase client.
- No `localStorage`.
- No `window` or `document`.
- No network calls.
- No toasts, redirects, uploads, or side effects.
- Easy to test with plain inputs and outputs.

Examples:

- Normalize item titles.
- Derive item types from MIME types.
- Build drafts from form values.
- Generate slugs.
- Derive timeline dates.

### Imperative Shell

Imperative shell files include:

- `*.api.ts`
- `*.queries.ts`
- `*.mutations.ts`
- Edge Functions
- Supabase access
- uploads
- authentication
- redirects
- toasts
- external API calls

Shell code should call functional core code for deterministic transformations.

## Supabase Organization

Supabase source lives in `backend/supabase`.

GitHub Supabase integration should use `backend` as the working directory.

For this phase, use only two schemas:

- `public`: frontend-accessible data protected by RLS.
- `private`: ingestion, AI, audit, rate limiting, and service-role-only tables.

Do not introduce extra schemas such as `core`, `vault`, `ingest`, `ai`, `social`, or `audit` yet unless a future PR gives a clear reason.

## Initial Domain Model

Suggested first tables for future migration PRs:

### public

- `profiles`
- `items`
- `collections`
- `collection_items`
- `sources`

### private

- `ingestion_jobs`
- `item_extractions`
- `ai_enrichments`
- `audit_events`
- `edge_rate_limits`

This PR only prepares structure and contracts. It does not apply remote migrations.

## PR Policy

Keep implementation traceable:

- Work from a focused branch.
- Do not work directly on `main`.
- Prefer one vertical slice per PR.
- Explain base branch and relationship to stacked PRs.
- Include checks run.
- Include screenshots for UI changes.
- Document migrations and RLS when Supabase changes are included.

## Reference Policy

Do not copy FACODI-specific patterns. When technical comparison is useful, use only `marcelo-m7/tube-o2` branch `facodi` as inspiration and adapt intentionally for Fonte.bio.
