# Fonte.bio Supabase

`backend/supabase/schema/*.sql` is the source of truth for the database shape. Migrations stay in `backend/supabase/migrations/` only as generated or reviewed deployment artifacts.

## Layout

```text
backend/supabase/
  config.toml
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
  package.json
```

## Local Rebuild

Start Supabase locally, then rebuild from the fixed schema:

```bash
supabase start --workdir backend/supabase
pnpm --dir backend/supabase supabase:schema:reset
```

`supabase:schema:reset` resets only the local Supabase database and reapplies the ordered files in `schema/`. It must not be pointed at production.

To apply the fixed schema to an already running local database without a reset:

```bash
pnpm --dir backend/supabase supabase:schema:apply
```

The scripts use the local Supabase database URL by default. Override only for disposable local databases:

```bash
SUPABASE_LOCAL_DB_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres pnpm --dir backend/supabase supabase:schema:apply
```

## Derived Migrations

When a controlled deploy needs migrations, generate them from the reviewed local schema state:

```bash
pnpm --dir backend/supabase supabase:schema:diff
```

Review the generated migration in a PR. Do not manually edit migrations as the primary database source.

## Types

Generate frontend Supabase types from the local schema:

```bash
pnpm --dir backend/supabase supabase:generate-types
```

## Production Safety

Production must never receive automatic `DROP`, `RESET`, or broad schema push commands from agent automation. Production changes require manual review, a PR, and a controlled deploy path.
