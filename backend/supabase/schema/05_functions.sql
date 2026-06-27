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

do $$
begin
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
