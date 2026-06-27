-- Historical parity migration.
-- Applied to production via mcp_supabase_apply_migration.
-- The reviewed schema guard lives in backend/supabase/schema/05_functions.sql.
select '20260627171410_harden_rls_auto_enable_execute_privileges' as migration_marker;
