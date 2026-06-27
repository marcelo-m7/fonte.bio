-- Fonte.bio static schema SSOT: public application tables.

do $$
begin
  if not exists (select 1 from pg_type where typnamespace = 'public'::regnamespace and typname = 'item_type') then
    create type public.item_type as enum ('video', 'audio', 'document', 'image', 'link', 'unknown');
  end if;

  if not exists (select 1 from pg_type where typnamespace = 'public'::regnamespace and typname = 'visibility') then
    create type public.visibility as enum ('private', 'workspace', 'public');
  end if;

  if not exists (select 1 from pg_type where typnamespace = 'public'::regnamespace and typname = 'source_kind') then
    create type public.source_kind as enum ('youtube', 'rss', 'website', 'file', 'manual');
  end if;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text check (display_name is null or length(btrim(display_name)) > 0),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sources (
  id uuid primary key default extensions.gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (length(btrim(name)) > 0),
  kind public.source_kind not null default 'manual',
  url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.collections (
  id uuid primary key default extensions.gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (length(btrim(name)) > 0),
  slug text not null check (length(btrim(slug)) > 0),
  description text,
  visibility public.visibility not null default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, slug)
);

create table if not exists public.items (
  id uuid primary key default extensions.gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (length(btrim(title)) > 0),
  type public.item_type not null default 'unknown',
  visibility public.visibility not null default 'private',
  source_id uuid references public.sources (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.collection_items (
  collection_id uuid not null references public.collections (id) on delete cascade,
  item_id uuid not null references public.items (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (collection_id, item_id)
);

create index if not exists sources_owner_id_idx on public.sources (owner_id);
create index if not exists collections_owner_id_idx on public.collections (owner_id);
create index if not exists collections_visibility_idx on public.collections (visibility);
create index if not exists items_owner_id_idx on public.items (owner_id);
create index if not exists items_source_id_idx on public.items (source_id);
create index if not exists items_visibility_idx on public.items (visibility);
create index if not exists collection_items_item_id_idx on public.collection_items (item_id);
