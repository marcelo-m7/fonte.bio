-- Fonte.bio static schema SSOT: row-level security policies.

alter table public.sources enable row level security;
alter table public.profiles enable row level security;
alter table public.collections enable row level security;
alter table public.items enable row level security;
alter table public.collection_items enable row level security;
alter table app_private.ingestion_jobs enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles_owner_select') then
    create policy profiles_owner_select on public.profiles for select using (id = auth.uid());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles_owner_insert') then
    create policy profiles_owner_insert on public.profiles for insert with check (id = auth.uid());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles_owner_update') then
    create policy profiles_owner_update on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'sources' and policyname = 'sources_owner_select') then
    create policy sources_owner_select on public.sources for select using (owner_id = auth.uid());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'sources' and policyname = 'sources_owner_insert') then
    create policy sources_owner_insert on public.sources for insert with check (owner_id = auth.uid());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'sources' and policyname = 'sources_owner_update') then
    create policy sources_owner_update on public.sources for update using (owner_id = auth.uid()) with check (owner_id = auth.uid());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'sources' and policyname = 'sources_owner_delete') then
    create policy sources_owner_delete on public.sources for delete using (owner_id = auth.uid());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'collections' and policyname = 'collections_visible_select') then
    create policy collections_visible_select on public.collections for select using (
      owner_id = auth.uid()
      or visibility = 'public'
      or (visibility = 'workspace' and auth.role() = 'authenticated')
    );
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'collections' and policyname = 'collections_owner_insert') then
    create policy collections_owner_insert on public.collections for insert with check (owner_id = auth.uid());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'collections' and policyname = 'collections_owner_update') then
    create policy collections_owner_update on public.collections for update using (owner_id = auth.uid()) with check (owner_id = auth.uid());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'collections' and policyname = 'collections_owner_delete') then
    create policy collections_owner_delete on public.collections for delete using (owner_id = auth.uid());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'items' and policyname = 'items_visible_select') then
    create policy items_visible_select on public.items for select using (
      owner_id = auth.uid()
      or visibility = 'public'
      or (visibility = 'workspace' and auth.role() = 'authenticated')
    );
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'items' and policyname = 'items_owner_insert') then
    create policy items_owner_insert on public.items for insert with check (
      owner_id = auth.uid()
      and (
        source_id is null
        or exists (select 1 from public.sources where sources.id = items.source_id and sources.owner_id = auth.uid())
      )
    );
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'items' and policyname = 'items_owner_update') then
    create policy items_owner_update on public.items for update using (owner_id = auth.uid()) with check (
      owner_id = auth.uid()
      and (
        source_id is null
        or exists (select 1 from public.sources where sources.id = items.source_id and sources.owner_id = auth.uid())
      )
    );
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'items' and policyname = 'items_owner_delete') then
    create policy items_owner_delete on public.items for delete using (owner_id = auth.uid());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'collection_items' and policyname = 'collection_items_visible_select') then
    create policy collection_items_visible_select on public.collection_items for select using (
      exists (select 1 from public.collections where collections.id = collection_items.collection_id)
      and exists (select 1 from public.items where items.id = collection_items.item_id)
    );
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'collection_items' and policyname = 'collection_items_owner_insert') then
    create policy collection_items_owner_insert on public.collection_items for insert with check (
      exists (select 1 from public.collections where collections.id = collection_items.collection_id and collections.owner_id = auth.uid())
      and exists (select 1 from public.items where items.id = collection_items.item_id and items.owner_id = auth.uid())
    );
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'collection_items' and policyname = 'collection_items_owner_delete') then
    create policy collection_items_owner_delete on public.collection_items for delete using (
      exists (select 1 from public.collections where collections.id = collection_items.collection_id and collections.owner_id = auth.uid())
      and exists (select 1 from public.items where items.id = collection_items.item_id and items.owner_id = auth.uid())
    );
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'app_private' and tablename = 'ingestion_jobs' and policyname = 'ingestion_jobs_owner_select') then
    create policy ingestion_jobs_owner_select on app_private.ingestion_jobs for select using (owner_id = auth.uid());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'app_private' and tablename = 'ingestion_jobs' and policyname = 'ingestion_jobs_owner_insert') then
    create policy ingestion_jobs_owner_insert on app_private.ingestion_jobs for insert with check (
      owner_id = auth.uid()
      and (
        source_id is null
        or exists (select 1 from public.sources where sources.id = ingestion_jobs.source_id and sources.owner_id = auth.uid())
      )
    );
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'app_private' and tablename = 'ingestion_jobs' and policyname = 'ingestion_jobs_owner_update') then
    create policy ingestion_jobs_owner_update on app_private.ingestion_jobs for update using (owner_id = auth.uid()) with check (
      owner_id = auth.uid()
      and (
        source_id is null
        or exists (select 1 from public.sources where sources.id = ingestion_jobs.source_id and sources.owner_id = auth.uid())
      )
    );
  end if;
end $$;
