insert into public.breeds (
  name,
  slug,
  tamil_name,
  short_description,
  full_description,
  starting_price,
  cover_image_path,
  is_featured,
  is_published,
  display_order
)
values
  ('Country White', 'country-white', 'நாட்டு வெள்ளை சேவல்', 'Strong country breed raised with natural feed.', 'Country White birds are part of the GRF Growths rooster collection. Confirm current birds, price and age directly through WhatsApp.', null, 'breeds/country-white/placeholder.webp', true, true, 10),
  ('Aseel', 'aseel', 'ஆசீல் இனம்', 'Powerful rooster type known for confident build and presence.', 'Aseel birds are part of the GRF Growths rooster collection. Confirm current birds, price and age directly through WhatsApp.', null, 'breeds/aseel/placeholder.webp', true, true, 20),
  ('Kili Seval', 'kili-seval', 'கிளி / சேவல் இனம்', 'Naturally raised bird category with active movement.', 'Kili Seval birds are part of the GRF Growths rooster collection. Confirm current birds, price and age directly through WhatsApp.', null, 'breeds/kili-seval/placeholder.webp', false, true, 30),
  ('Nattu Seval', 'nattu-seval', 'நாட்டு சேவல்', 'Traditional country rooster category.', 'Nattu Seval birds are part of the GRF Growths rooster collection. Confirm current birds, price and age directly through WhatsApp.', null, 'breeds/nattu-seval/placeholder.webp', true, true, 40),
  ('Kadaknath', 'kadaknath', 'கடக்நாத்', 'Distinct dark-feathered bird category.', 'Kadaknath birds are part of the GRF Growths rooster collection. Confirm current birds, price and age directly through WhatsApp.', null, 'breeds/kadaknath/placeholder.webp', false, true, 50),
  ('Giriraja', 'giriraja', 'கிரிராஜா இனம்', 'Hardy bird type suitable for village farming needs.', 'Giriraja birds are part of the GRF Growths rooster collection. Confirm current birds, price and age directly through WhatsApp.', null, 'breeds/giriraja/placeholder.webp', false, true, 60)
on conflict (slug) do update
set tamil_name = excluded.tamil_name,
    short_description = excluded.short_description,
    full_description = excluded.full_description,
    is_published = excluded.is_published,
    display_order = excluded.display_order;

insert into public.birds (
  bird_code,
  breed_id,
  title,
  age_months,
  weight_kg,
  colour,
  gender,
  price,
  discount_price,
  description,
  status,
  is_featured,
  is_published
)
select bird_code, breeds.id, title, age_months, weight_kg, colour, gender, price, discount_price, description, status, is_featured, is_published
from (
  values
    ('GRF-101', 'country-white', 'Country White Rooster', null::integer, null::numeric, 'White country feathering', 'male', null::numeric, null::numeric, 'Strong country breed raised with natural feed and careful daily handling.', 'available', true, true),
    ('GRF-102', 'aseel', 'Aseel Breed', null::integer, null::numeric, 'Deep red and dark tones', 'male', null::numeric, null::numeric, 'A powerful rooster type known for confident build, stamina and presence.', 'available', true, true),
    ('GRF-103', 'kili-seval', 'Kili / Seval Breed', null::integer, null::numeric, 'Natural mixed plumage', 'male', null::numeric, null::numeric, 'Naturally raised with good care, steady feeding and active movement.', 'available', false, true),
    ('GRF-104', 'nattu-seval', 'Nattu Seval', null::integer, null::numeric, 'Traditional country tones', 'male', null::numeric, null::numeric, 'Traditional country rooster type suited for farmers and rooster lovers.', 'available', false, true),
    ('GRF-105', 'kadaknath', 'Kadaknath', null::integer, null::numeric, 'Dark feathering', 'male', null::numeric, null::numeric, 'Distinct dark-feathered bird category. Current availability changes quickly.', 'available', false, true),
    ('GRF-106', 'giriraja', 'Giriraja Breed', null::integer, null::numeric, 'Brown and gold tones', 'male', null::numeric, null::numeric, 'Hardy and fast-growing bird type suitable for village farming needs.', 'available', false, true)
) as seed(bird_code, breed_slug, title, age_months, weight_kg, colour, gender, price, discount_price, description, status, is_featured, is_published)
join public.breeds on breeds.slug = seed.breed_slug
on conflict (bird_code) do update
set title = excluded.title,
    breed_id = excluded.breed_id,
    colour = excluded.colour,
    description = excluded.description,
    status = excluded.status,
    is_featured = excluded.is_featured,
    is_published = excluded.is_published;

insert into public.faqs (question, answer, is_published, display_order)
values
  ('How do I check current bird availability?', 'Send a WhatsApp enquiry with the Bird ID. Availability changes, so GRF Growths will confirm the latest status directly.', true, 10),
  ('Are prices listed on the website?', 'Prices are kept as Contact for Price because bird age, breed and availability can change.', true, 20),
  ('Can I visit the farm?', 'Farm visits can be discussed by phone or WhatsApp before arriving.', true, 30),
  ('Is delivery available?', 'GRF Growths provides delivery guidance and coordination support where possible.', true, 40),
  ('How does booking work?', 'Share the Bird ID, confirm availability, discuss price, then follow the booking instructions from GRF Growths.', true, 50)
on conflict do nothing;

insert into public.site_settings (setting_key, setting_value)
values
  ('contact', '{"phoneDisplay":"+91 99529 08818","phoneNumber":"919952908818","email":"grf.entrepreneur@gmail.com","instagram":"https://www.instagram.com/guru_rooster/","maps":"https://maps.app.goo.gl/gRkaQ4JexHB9AtSr6","address":"No.81, Mankanoor, Puthagaram, Tamil Nadu 635602","hours":"Monday-Sunday: 6:00 AM-8:00 PM"}'::jsonb),
  ('content_notes', '{"testimonials":"Placeholders only. Publish real testimonials after customer approval.","prices":"Exact prices intentionally omitted until GRF Growths confirms live pricing."}'::jsonb)
on conflict (setting_key) do update set setting_value = excluded.setting_value;
