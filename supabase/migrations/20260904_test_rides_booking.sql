-- Additive booking fields for test rides.
-- Safe to re-run. Existing RLS already restricts create/read to the owner.

alter table public.test_rides
  add column if not exists rider_name text,
  add column if not exists rider_email text,
  add column if not exists rider_phone text,
  add column if not exists preferred_time text;

alter table public.test_rides enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'test_rides'
      and policyname = 'Users can view own rides'
  ) then
    create policy "Users can view own rides"
      on public.test_rides for select
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'test_rides'
      and policyname = 'Users can create own rides'
  ) then
    create policy "Users can create own rides"
      on public.test_rides for insert
      with check (auth.uid() = user_id);
  end if;
end $$;