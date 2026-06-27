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
