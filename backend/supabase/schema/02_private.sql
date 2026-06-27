-- Fonte.bio static schema SSOT: private operational tables.

create schema if not exists app_private;

do $$
begin
  if not exists (select 1 from pg_type where typnamespace = 'app_private'::regnamespace and typname = 'ingestion_job_status') then
    create type app_private.ingestion_job_status as enum ('queued', 'running', 'succeeded', 'failed', 'cancelled');
  end if;
end $$;

create table if not exists app_private.ingestion_jobs (
  id uuid primary key default extensions.gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  source_id uuid references public.sources (id) on delete set null,
  status app_private.ingestion_job_status not null default 'queued',
  input jsonb not null default '{}'::jsonb,
  result jsonb,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  started_at timestamptz,
  finished_at timestamptz
);

create index if not exists ingestion_jobs_owner_id_idx on app_private.ingestion_jobs (owner_id);
create index if not exists ingestion_jobs_source_id_idx on app_private.ingestion_jobs (source_id);
create index if not exists ingestion_jobs_status_idx on app_private.ingestion_jobs (status);
