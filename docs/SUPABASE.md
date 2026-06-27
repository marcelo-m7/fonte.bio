# Fonte.bio Supabase Workflow

## Project

- Supabase project name: `fonte.bio`
- Supabase project ref: `lgmwiuxvvapqcrqrcqdf`
- GitHub integration working directory: `backend`
- Versioned Supabase directory: `backend/supabase`

## Directory Layout

```text
backend/supabase/
  config.toml
  migrations/
  functions/
    _shared/
    ingest-source/
    process-item/
    suggest-collections/
    publish-item/
  seed.sql
```

## Migrations

Migrations must live in:

```text
backend/supabase/migrations
```

Do not apply remote migrations from a broad feature PR. Schema PRs should be small and should document:

- Tables created or changed.
- RLS policies created or changed.
- Backfill or seed requirements.
- Rollback notes when relevant.

## Edge Functions

Edge Functions must live in:

```text
backend/supabase/functions
```

Shared helpers live in:

```text
backend/supabase/functions/_shared
```

Keep function handlers thin. Put deterministic transformations in frontend/backend functional core modules when possible, and keep Supabase/service-role work inside the imperative shell.

## Secrets Rule

Never commit:

- Supabase service role keys.
- Real `.env` files.
- Access tokens.
- Production credentials.

Frontend code may use only public Vite variables such as:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Service role keys belong only in Supabase secrets or secure deployment environments.

## Local Commands

Run commands from repository root unless stated otherwise.

```bash
supabase link --project-ref lgmwiuxvvapqcrqrcqdf --workdir backend/supabase
supabase db reset --workdir backend/supabase
supabase db push --workdir backend/supabase
supabase gen types typescript --project-id lgmwiuxvvapqcrqrcqdf > fonte.tube/frontend/src/shared/types/supabase.generated.ts
supabase functions list --project-ref lgmwiuxvvapqcrqrcqdf
```

If CLI flags change, prefer the official Supabase CLI help and keep this file updated.

## Current Phase

This phase creates the versioned directory and shared Edge Function helper skeletons only. No remote migration is applied.
