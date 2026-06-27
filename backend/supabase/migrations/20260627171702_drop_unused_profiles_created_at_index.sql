-- Historical parity migration.
-- Applied to production via mcp_supabase_apply_migration.
-- The index is intentionally absent from backend/supabase/schema/01_public.sql.
select '20260627171702_drop_unused_profiles_created_at_index' as migration_marker;
