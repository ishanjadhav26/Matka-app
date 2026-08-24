create extension if not exists pgcrypto;

create table public.markets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  open_number text,
  jodi text,
  close_number text,
  open_time text,
  close_time text,
  status text default 'Pending',
  category text default 'main',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table public.market_history (
  id uuid primary key default gen_random_uuid(),
  market_id uuid references public.markets(id) on delete cascade,
  result_date date not null,
  open_number text,
  jodi text,
  close_number text,
  created_at timestamp with time zone default now()
);

-- RLS Policies
alter table public.markets enable row level security;
alter table public.market_history enable row level security;

create policy "Public read markets"
on public.markets
for select
using (true);

create policy "Public read history"
on public.market_history
for select
using (true);

create policy "Authenticated manage markets"
on public.markets
for all
using (auth.role() = 'authenticated');

create policy "Authenticated manage history"
on public.market_history
for all
using (auth.role() = 'authenticated');
