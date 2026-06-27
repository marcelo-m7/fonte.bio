-- Fonte.bio static schema SSOT: database functions and triggers.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    nullif(btrim(coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))), ''),
    nullif(btrim(new.raw_user_meta_data ->> 'avatar_url'), '')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

revoke execute on function public.handle_new_user_profile() from public;
revoke execute on function public.handle_new_user_profile() from anon;
revoke execute on function public.handle_new_user_profile() from authenticated;

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

do $$
begin
  if exists (select 1 from pg_proc where oid = 'public.rls_auto_enable()'::regprocedure) then
    revoke execute on function public.rls_auto_enable() from public;
    revoke execute on function public.rls_auto_enable() from anon;
    revoke execute on function public.rls_auto_enable() from authenticated;
  end if;
exception
  when undefined_function then
    null;
end $$;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'users_create_profile') then
    create trigger users_create_profile
    after insert on auth.users
    for each row execute function public.handle_new_user_profile();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'profiles_set_updated_at') then
    create trigger profiles_set_updated_at
    before update on public.profiles
    for each row execute function public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'sources_set_updated_at') then
    create trigger sources_set_updated_at
    before update on public.sources
    for each row execute function public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'collections_set_updated_at') then
    create trigger collections_set_updated_at
    before update on public.collections
    for each row execute function public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'items_set_updated_at') then
    create trigger items_set_updated_at
    before update on public.items
    for each row execute function public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'ingestion_jobs_set_updated_at') then
    create trigger ingestion_jobs_set_updated_at
    before update on app_private.ingestion_jobs
    for each row execute function public.set_updated_at();
  end if;
end $$;
