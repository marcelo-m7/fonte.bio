-- Historical parity migration.
-- Applied to production via mcp_supabase_apply_migration.
-- The reviewed schema change lives in backend/supabase/schema/05_functions.sql.
select '20260627171346_harden_profile_trigger_execute_privileges' as migration_marker;
