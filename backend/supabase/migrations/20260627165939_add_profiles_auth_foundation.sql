-- Historical parity migration.
-- Applied to production via mcp_supabase_apply_migration.
-- The reviewed schema change lives in backend/supabase/schema/01_public.sql,
-- backend/supabase/schema/03_rls.sql, and backend/supabase/schema/05_functions.sql.
select '20260627165939_add_profiles_auth_foundation' as migration_marker;
