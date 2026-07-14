create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'viewer' check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.breeds (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  tamil_name text,
  short_description text,
  full_description text,
  starting_price numeric,
  cover_image_path text,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.birds (
  id uuid primary key default gen_random_uuid(),
  bird_code text not null unique,
  breed_id uuid references public.breeds(id) on delete set null,
  title text not null,
  age_months integer,
  weight_kg numeric,
  colour text,
  gender text,
  price numeric,
  discount_price numeric,
  description text,
  status text not null default 'available' check (status in ('available', 'reserved', 'sold', 'hidden')),
  is_featured boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bird_images (
  id uuid primary key default gen_random_uuid(),
  bird_id uuid not null references public.birds(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  is_primary boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  title text,
  alt_text text,
  category text not null default 'general' check (category in ('farm', 'birds', 'customers', 'delivery', 'general')),
  is_published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  customer_name text,
  phone text,
  email text,
  bird_id uuid references public.birds(id) on delete set null,
  breed_id uuid references public.breeds(id) on delete set null,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'interested', 'completed', 'closed')),
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text,
  location text,
  content text,
  image_path text,
  is_published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text,
  answer text,
  is_published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text not null unique,
  setting_value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists breeds_set_updated_at on public.breeds;
create trigger breeds_set_updated_at before update on public.breeds
for each row execute function public.set_updated_at();

drop trigger if exists birds_set_updated_at on public.birds;
create trigger birds_set_updated_at before update on public.birds
for each row execute function public.set_updated_at();

drop trigger if exists enquiries_set_updated_at on public.enquiries;
create trigger enquiries_set_updated_at before update on public.enquiries
for each row execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at before update on public.site_settings
for each row execute function public.set_updated_at();

create index if not exists breeds_slug_idx on public.breeds(slug);
create index if not exists breeds_published_idx on public.breeds(is_published);
create index if not exists breeds_featured_idx on public.breeds(is_featured);
create index if not exists breeds_display_order_idx on public.breeds(display_order);
create index if not exists breeds_created_at_idx on public.breeds(created_at desc);

create index if not exists birds_code_idx on public.birds(bird_code);
create index if not exists birds_breed_idx on public.birds(breed_id);
create index if not exists birds_status_idx on public.birds(status);
create index if not exists birds_published_idx on public.birds(is_published);
create index if not exists birds_featured_idx on public.birds(is_featured);
create index if not exists birds_created_at_idx on public.birds(created_at desc);

create index if not exists bird_images_bird_order_idx on public.bird_images(bird_id, display_order);
create index if not exists bird_images_primary_idx on public.bird_images(bird_id, is_primary);

create index if not exists gallery_published_idx on public.gallery_images(is_published);
create index if not exists gallery_category_idx on public.gallery_images(category);
create index if not exists gallery_display_order_idx on public.gallery_images(display_order);
create index if not exists gallery_created_at_idx on public.gallery_images(created_at desc);

create index if not exists enquiries_status_idx on public.enquiries(status);
create index if not exists enquiries_created_at_idx on public.enquiries(created_at desc);
create index if not exists enquiries_bird_idx on public.enquiries(bird_id);
create index if not exists enquiries_breed_idx on public.enquiries(breed_id);

create index if not exists testimonials_published_idx on public.testimonials(is_published);
create index if not exists testimonials_display_order_idx on public.testimonials(display_order);

create index if not exists faqs_published_idx on public.faqs(is_published);
create index if not exists faqs_display_order_idx on public.faqs(display_order);

create or replace function public.current_admin_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.profiles
  where id = auth.uid()
  limit 1;
$$;

create or replace function public.has_admin_role(allowed_roles text[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = any(allowed_roles)
  );
$$;

create or replace function public.handle_new_admin_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    'viewer'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_grf_profile on auth.users;
create trigger on_auth_user_created_grf_profile
  after insert on auth.users
  for each row execute function public.handle_new_admin_user();

create unique index if not exists one_primary_image_per_bird_idx
  on public.bird_images(bird_id)
  where is_primary;
