-- Fonte.bio static schema SSOT: storage buckets and policies.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'source-files',
  'source-files',
  false,
  52428800,
  array['image/*', 'video/*', 'audio/*', 'application/pdf', 'text/plain']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'source_files_owner_select') then
    create policy source_files_owner_select on storage.objects for select using (
      bucket_id = 'source-files'
      and owner = (select auth.uid())
    );
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'source_files_owner_insert') then
    create policy source_files_owner_insert on storage.objects for insert with check (
      bucket_id = 'source-files'
      and owner = (select auth.uid())
    );
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'source_files_owner_update') then
    create policy source_files_owner_update on storage.objects for update using (
      bucket_id = 'source-files'
      and owner = (select auth.uid())
    ) with check (
      bucket_id = 'source-files'
      and owner = (select auth.uid())
    );
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'source_files_owner_delete') then
    create policy source_files_owner_delete on storage.objects for delete using (
      bucket_id = 'source-files'
      and owner = (select auth.uid())
    );
  end if;
end $$;
