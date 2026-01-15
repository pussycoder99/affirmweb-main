-- Create a table for application settings
create table app_settings (
  id text primary key,
  url text,
  identifier text,
  secret text,
  proxy_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table app_settings enable row level security;

-- Create a policy that allows only authenticated users (admins) to select
create policy "Enable read access for authenticated users only"
on app_settings for select
to authenticated
using (true);

-- Create a policy that allows only authenticated users (admins) to insert/update
create policy "Enable insert/update access for authenticated users only"
on app_settings for all
to authenticated
using (true)
with check (true);

-- Insert a default row placeholder (optional)
insert into app_settings (id, url, identifier, secret)
values ('whmcs_config', 'https://your-whmcs.com/includes/api.php', '', '')
on conflict (id) do nothing;
