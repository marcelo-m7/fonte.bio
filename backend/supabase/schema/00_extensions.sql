-- Fonte.bio static schema SSOT: extensions.
-- Apply locally from a clean Supabase database before the remaining schema files.

create extension if not exists pgcrypto with schema extensions;
