insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'grf-media',
  'grf-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read grf media" on storage.objects;
create policy "Public read grf media" on storage.objects
  for select using (bucket_id = 'grf-media');

drop policy if exists "Admin editor insert grf media" on storage.objects;
create policy "Admin editor insert grf media" on storage.objects
  for insert with check (
    bucket_id = 'grf-media'
    and public.has_admin_role(array['admin', 'editor'])
  );

drop policy if exists "Admin editor update grf media" on storage.objects;
create policy "Admin editor update grf media" on storage.objects
  for update using (
    bucket_id = 'grf-media'
    and public.has_admin_role(array['admin', 'editor'])
  )
  with check (
    bucket_id = 'grf-media'
    and public.has_admin_role(array['admin', 'editor'])
  );

drop policy if exists "Admin editor delete grf media" on storage.objects;
create policy "Admin editor delete grf media" on storage.objects
  for delete using (
    bucket_id = 'grf-media'
    and public.has_admin_role(array['admin', 'editor'])
  );
