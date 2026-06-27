-- Historical parity migration.
-- Applied to production via mcp_supabase_apply_migration from the reviewed static schema.
-- Keep this file so the Supabase GitHub App can match remote migration history.
-- The source of truth remains backend/supabase/schema/*.sql.
select '20260627132346_apply_static_schema_baseline' as migration_marker;
