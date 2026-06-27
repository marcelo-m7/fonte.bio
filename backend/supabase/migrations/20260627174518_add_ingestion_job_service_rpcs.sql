-- Derived deployment migration for the ingestion jobs pipeline.
-- The reviewed source remains backend/supabase/schema/05_functions.sql.

create or replace function public.fonte_list_ingestion_jobs(p_owner_id uuid)
returns table (
  id uuid,
  source_id uuid,
  status text,
  input jsonb,
  result jsonb,
  error_message text,
  created_at timestamptz,
  updated_at timestamptz,
  started_at timestamptz,
  finished_at timestamptz
)
language sql
security definer
set search_path = public, app_private
as $$
  select
    ingestion_jobs.id,
    ingestion_jobs.source_id,
    ingestion_jobs.status::text,
    ingestion_jobs.input,
    ingestion_jobs.result,
    ingestion_jobs.error_message,
    ingestion_jobs.created_at,
    ingestion_jobs.updated_at,
    ingestion_jobs.started_at,
    ingestion_jobs.finished_at
  from app_private.ingestion_jobs
  where ingestion_jobs.owner_id = p_owner_id
  order by ingestion_jobs.created_at desc
  limit 20;
$$;

create or replace function public.fonte_enqueue_ingestion_job(p_owner_id uuid, p_source_id uuid)
returns table (
  id uuid,
  source_id uuid,
  status text,
  input jsonb,
  result jsonb,
  error_message text,
  created_at timestamptz,
  updated_at timestamptz,
  started_at timestamptz,
  finished_at timestamptz
)
language plpgsql
security definer
set search_path = public, app_private
as $$
declare
  source_row public.sources%rowtype;
  job_row app_private.ingestion_jobs%rowtype;
begin
  select * into source_row
  from public.sources
  where sources.id = p_source_id
    and sources.owner_id = p_owner_id;

  if not found then
    raise exception 'source_not_found' using errcode = 'P0002';
  end if;

  insert into app_private.ingestion_jobs (owner_id, source_id, status, input)
  values (
    p_owner_id,
    p_source_id,
    'queued',
    jsonb_build_object(
      'source', jsonb_build_object(
        'id', source_row.id,
        'name', source_row.name,
        'kind', source_row.kind,
        'url', source_row.url
      ),
      'requestedBy', 'manual'
    )
  )
  returning * into job_row;

  return query select
    job_row.id,
    job_row.source_id,
    job_row.status::text,
    job_row.input,
    job_row.result,
    job_row.error_message,
    job_row.created_at,
    job_row.updated_at,
    job_row.started_at,
    job_row.finished_at;
end;
$$;

revoke execute on function public.fonte_list_ingestion_jobs(uuid) from public;
revoke execute on function public.fonte_list_ingestion_jobs(uuid) from anon;
revoke execute on function public.fonte_list_ingestion_jobs(uuid) from authenticated;
grant execute on function public.fonte_list_ingestion_jobs(uuid) to service_role;

revoke execute on function public.fonte_enqueue_ingestion_job(uuid, uuid) from public;
revoke execute on function public.fonte_enqueue_ingestion_job(uuid, uuid) from anon;
revoke execute on function public.fonte_enqueue_ingestion_job(uuid, uuid) from authenticated;
grant execute on function public.fonte_enqueue_ingestion_job(uuid, uuid) to service_role;