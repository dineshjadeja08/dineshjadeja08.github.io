alter table public.profiles enable row level security;
alter table public.breeds enable row level security;
alter table public.birds enable row level security;
alter table public.bird_images enable row level security;
alter table public.gallery_images enable row level security;
alter table public.enquiries enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile" on public.profiles
  for select using (auth.uid() = id or public.has_admin_role(array['admin']));

drop policy if exists "Admins manage profiles" on public.profiles;
create policy "Admins manage profiles" on public.profiles
  for all using (public.has_admin_role(array['admin']))
  with check (public.has_admin_role(array['admin']));

drop policy if exists "Public read published breeds" on public.breeds;
create policy "Public read published breeds" on public.breeds
  for select using (is_published = true);

drop policy if exists "Admin editor manage breeds" on public.breeds;
create policy "Admin editor manage breeds" on public.breeds
  for all using (public.has_admin_role(array['admin', 'editor']))
  with check (public.has_admin_role(array['admin', 'editor']));

drop policy if exists "Viewer read breeds" on public.breeds;
create policy "Viewer read breeds" on public.breeds
  for select using (public.has_admin_role(array['viewer']));

drop policy if exists "Public read published birds" on public.birds;
create policy "Public read published birds" on public.birds
  for select using (is_published = true and status <> 'hidden');

drop policy if exists "Admin editor manage birds" on public.birds;
create policy "Admin editor manage birds" on public.birds
  for all using (public.has_admin_role(array['admin', 'editor']))
  with check (public.has_admin_role(array['admin', 'editor']));

drop policy if exists "Viewer read birds" on public.birds;
create policy "Viewer read birds" on public.birds
  for select using (public.has_admin_role(array['viewer']));

drop policy if exists "Public read published bird images" on public.bird_images;
create policy "Public read published bird images" on public.bird_images
  for select using (
    exists (
      select 1
      from public.birds
      where birds.id = bird_images.bird_id
        and birds.is_published = true
        and birds.status <> 'hidden'
    )
  );

drop policy if exists "Admin editor manage bird images" on public.bird_images;
create policy "Admin editor manage bird images" on public.bird_images
  for all using (public.has_admin_role(array['admin', 'editor']))
  with check (public.has_admin_role(array['admin', 'editor']));

drop policy if exists "Viewer read bird images" on public.bird_images;
create policy "Viewer read bird images" on public.bird_images
  for select using (public.has_admin_role(array['viewer']));

drop policy if exists "Public read published gallery images" on public.gallery_images;
create policy "Public read published gallery images" on public.gallery_images
  for select using (is_published = true);

drop policy if exists "Admin editor manage gallery images" on public.gallery_images;
create policy "Admin editor manage gallery images" on public.gallery_images
  for all using (public.has_admin_role(array['admin', 'editor']))
  with check (public.has_admin_role(array['admin', 'editor']));

drop policy if exists "Viewer read gallery images" on public.gallery_images;
create policy "Viewer read gallery images" on public.gallery_images
  for select using (public.has_admin_role(array['viewer']));

drop policy if exists "Public insert enquiries" on public.enquiries;
create policy "Public insert enquiries" on public.enquiries
  for insert with check (
    coalesce(status, 'new') = 'new'
    and length(coalesce(phone, '')) <= 32
    and length(coalesce(email, '')) <= 254
    and length(coalesce(message, '')) <= 2000
  );

drop policy if exists "Admins manage enquiries" on public.enquiries;
create policy "Admins manage enquiries" on public.enquiries
  for all using (public.has_admin_role(array['admin']))
  with check (public.has_admin_role(array['admin']));

drop policy if exists "Public read published testimonials" on public.testimonials;
create policy "Public read published testimonials" on public.testimonials
  for select using (is_published = true);

drop policy if exists "Admin editor manage testimonials" on public.testimonials;
create policy "Admin editor manage testimonials" on public.testimonials
  for all using (public.has_admin_role(array['admin', 'editor']))
  with check (public.has_admin_role(array['admin', 'editor']));

drop policy if exists "Viewer read testimonials" on public.testimonials;
create policy "Viewer read testimonials" on public.testimonials
  for select using (public.has_admin_role(array['viewer']));

drop policy if exists "Public read published faqs" on public.faqs;
create policy "Public read published faqs" on public.faqs
  for select using (is_published = true);

drop policy if exists "Admin editor manage faqs" on public.faqs;
create policy "Admin editor manage faqs" on public.faqs
  for all using (public.has_admin_role(array['admin', 'editor']))
  with check (public.has_admin_role(array['admin', 'editor']));

drop policy if exists "Viewer read faqs" on public.faqs;
create policy "Viewer read faqs" on public.faqs
  for select using (public.has_admin_role(array['viewer']));

drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings" on public.site_settings
  for all using (public.has_admin_role(array['admin']))
  with check (public.has_admin_role(array['admin']));
