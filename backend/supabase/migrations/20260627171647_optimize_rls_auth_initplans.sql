-- Historical parity migration.
-- Applied to production via mcp_supabase_apply_migration.
-- The reviewed RLS expressions live in backend/supabase/schema/03_rls.sql
-- and backend/supabase/schema/04_storage.sql.
select '20260627171647_optimize_rls_auth_initplans' as migration_marker;
