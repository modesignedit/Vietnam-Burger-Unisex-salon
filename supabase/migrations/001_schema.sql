-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Services table
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  price integer not null,
  description text,
  category text check (category in ('Hair', 'Beauty', 'Grooming')),
  image_url text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Gallery table
create table if not exists gallery (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  alt_text text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Site settings table
create table if not exists site_settings (
  id uuid primary key default uuid_generate_v4(),
  section text not null,
  key text not null,
  value jsonb not null default '{}',
  updated_at timestamptz default now(),
  unique(section, key)
);

-- RLS: Enable row-level security
alter table services enable row level security;
alter table gallery enable row level security;
alter table site_settings enable row level security;

-- Public read policies
create policy "Public can read services"
  on services for select using (true);
create policy "Public can read gallery"
  on gallery for select using (true);
create policy "Public can read site_settings"
  on site_settings for select using (true);

-- Authenticated write policies
create policy "Authenticated users can insert services"
  on services for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update services"
  on services for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete services"
  on services for delete using (auth.role() = 'authenticated');

create policy "Authenticated users can insert gallery"
  on gallery for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update gallery"
  on gallery for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete gallery"
  on gallery for delete using (auth.role() = 'authenticated');

create policy "Authenticated users can insert site_settings"
  on site_settings for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update site_settings"
  on site_settings for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete site_settings"
  on site_settings for delete using (auth.role() = 'authenticated');
