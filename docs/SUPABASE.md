# Fonte.bio Supabase Workflow

## Project

- Supabase project name: `fonte.bio`
- Supabase project ref: `lgmwiuxvvapqcrqrcqdf`
- GitHub integration working directory: `backend`
- Versioned Supabase directory: `backend/supabase`

## Strategy

Fonte.bio uses fixed, readable SQL files as the database source of truth:

```text
backend/supabase/schema/*.sql
```

This keeps the complete database shape reviewable in a small set of ordered files. Reviewers should not need to reconstruct intent from a migration chain. Every structural database change starts in the fixed schema. Migrations are secondary artifacts for controlled deployment, not the manual design surface.

## Directory Layout

```text
backend/supabase/
  config.toml
  README.md
  schema/
    00_extensions.sql
    01_public.sql
    02_private.sql
    03_rls.sql
    04_storage.sql
    05_functions.sql
    99_seed.sql
  migrations/
    .gitkeep
  functions/
    _shared/
    ingest-source/
    process-item/
    suggest-collections/
    publish-item/
```

## Static Schema Files

Use the ordered schema files for database design:

```text
00_extensions.sql  -- required extensions
01_public.sql      -- public tables, indexes, and public enums
02_private.sql     -- private schemas and operational tables
03_rls.sql         -- RLS enablement and policies
04_storage.sql     -- buckets and storage policies
05_functions.sql   -- database functions and triggers
99_seed.sql        -- deterministic local seed data only
```

Keep these files deterministic, readable, and free of production data. Do not commit secrets, tokens, real user data, or service-role credentials.

## Local Rebuild

Run local rebuild commands from the repository root:

```bash
supabase start --workdir backend/supabase
pnpm --dir backend/supabase supabase:schema:reset
```

`supabase:schema:reset` is local-only. It rebuilds the local Supabase database and applies `backend/supabase/schema/*.sql` in filename order.

To apply the fixed schema to a disposable local database without resetting it:

```bash
pnpm --dir backend/supabase supabase:schema:apply
```

The helper scripts use the local Supabase database URL by default:

```text
postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

Override `SUPABASE_LOCAL_DB_URL` only for disposable local databases.

## RLS Validation

Every table that contains user-owned data must have RLS enabled in `03_rls.sql`. Schema PRs that touch tables or policies should document:

- Tables created or changed.
- RLS policies created or changed.
- Manual SQL probes or app flows used to verify owner access.
- Anonymous access expectations.
- Authenticated cross-user access expectations.

At minimum, validate that:

- Owners can read and write their own private rows.
- Other authenticated users cannot read private rows owned by someone else.
- Public rows are readable according to the documented policy.
- Storage objects follow the same ownership boundary.

`public.profiles` is owned by `auth.users.id` and uses owner-only select, insert, and update policies. New Supabase Auth users get a profile through the `users_create_profile` trigger on `auth.users`.

Security definer functions used by triggers must not be callable through the public API. `public.handle_new_user_profile()` and the existing `public.rls_auto_enable()` helper have explicit execute revokes for `public`, `anon`, and `authenticated`.

Use `(select auth.uid())` and `(select auth.role())` inside RLS policies so auth helper calls are evaluated once per statement instead of once per row.

## Migrations

`backend/supabase/migrations/` is intentionally secondary. Keep migration files there as reviewed deploy artifacts or historical parity files for migrations already applied remotely.

Migrations are acceptable only when a controlled deploy path needs a reviewed, derived artifact. In that case:

1. Update `backend/supabase/schema/*.sql` first.
2. Rebuild and validate the local database.
3. Generate a migration from the reviewed local state:

```bash
pnpm --dir backend/supabase supabase:schema:diff
```

4. Review the generated migration in the PR.

Do not hand-edit migrations as the primary source of schema design.

The Supabase GitHub App fails preview checks when remote migration versions are missing from `backend/supabase/migrations/`. When MCP has already applied a production migration, commit a parity migration with the same `<version>_<name>.sql` filename so previews can reconcile history.

## Production Handling

Do not run automatic `DROP`, `RESET`, broad `db push`, or destructive schema commands against production from agent automation. Production changes must be reviewed manually or delivered through a PR-approved deployment path.

The production baseline was applied with `mcp_supabase_apply_migration` from the reviewed static schema on 2026-06-27. Future production DDL should still begin in `backend/supabase/schema/*.sql` and use a reviewed migration/deploy step.

For production-impacting database changes, the PR must include:

- Static schema diff summary.
- Generated migration or manual deployment plan, when required.
- RLS validation notes.
- Backfill or data migration plan, if any.
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

The production frontend uses the public project URL and publishable key through:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

These are browser-exposed values. Do not replace them with service-role credentials.

## Local Commands

Run commands from repository root unless stated otherwise.

```bash
supabase link --project-ref lgmwiuxvvapqcrqrcqdf --workdir backend/supabase
pnpm --dir backend/supabase supabase:schema:reset
pnpm --dir backend/supabase supabase:schema:apply
pnpm --dir backend/supabase supabase:schema:diff
pnpm --dir backend/supabase supabase:generate-types
supabase functions list --project-ref lgmwiuxvvapqcrqrcqdf
```

If CLI flags change, prefer the official Supabase CLI help and keep this file updated.

## Current Phase

The static schema workflow is active and the production baseline is applied. Frontend reads use the production Supabase project when public Vite variables are present. Supabase Auth is the browser identity provider, and `public.profiles` stores editable user-facing profile metadata.

Security and performance advisors should be reviewed after every production DDL step. As of the Auth/Profile QA pass, the remaining security advisor is Supabase Auth leaked-password protection, which must be enabled from the Supabase Auth configuration surface rather than schema SQL. Remaining performance advisors are unused-index info notices on empty or seed-light tables and should be revisited after real traffic lands.
