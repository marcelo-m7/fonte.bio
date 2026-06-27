# Fonte.bio Architecture

Fonte.bio evolves through small pull requests with a simple functional modular architecture. The goal is to keep product code easy to reason about while still supporting a full end-to-end path from frontend interactions to Supabase-backed data and Edge Functions.

## Current Base

The current base includes the production Supabase baseline, the static schema workflow, and a frontend data boundary that can fall back to mock data when public Supabase variables are not configured.

## Frontend Organization

The frontend lives in `frontend/` at the repository root.

The target structure is intentionally simpler than pure Feature-Sliced Design:

```text
src/
  app/
  pages/
  modules/
    auth/
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

Use TanStack Query for remote state in module shell files:

- `*.queries.ts` exposes read hooks such as `useItems`.
- `*.mutations.ts` exposes write hooks such as `useCreateItem`.
- `*.api.ts` remains the only module file that calls Supabase directly.
- Components and pages consume hooks, not the Supabase client.

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
- TanStack Query hooks and cache invalidation
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

For this phase, use only two application schemas:

- `public`: frontend-accessible data protected by RLS.
- `app_private`: ingestion, AI, audit, rate limiting, and service-role-only tables.

Do not introduce extra schemas such as `core`, `vault`, `ingest`, `ai`, `social`, or `audit` yet unless a future PR gives a clear reason.

## Initial Domain Model

Suggested first tables for future migration PRs:

### public

- `profiles`
- `items`
- `collections`
- `collection_items`
- `sources`

### app_private

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
