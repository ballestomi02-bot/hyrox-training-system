-- HYROX Training System: private per-user cloud storage
create table if not exists public.training_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{"logs":[],"recovery":[]}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.training_data enable row level security;
drop policy if exists "Users can read their own training data" on public.training_data;
create policy "Users can read their own training data" on public.training_data for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Users can create their own training data" on public.training_data;
create policy "Users can create their own training data" on public.training_data for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "Users can update their own training data" on public.training_data;
create policy "Users can update their own training data" on public.training_data for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
grant select, insert, update on public.training_data to authenticated;
revoke all on public.training_data from anon;
