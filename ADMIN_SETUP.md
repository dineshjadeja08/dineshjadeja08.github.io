# Admin Setup

The admin CMS is intentionally closed: there is no public registration screen. Create users in Supabase Auth, then grant roles in `public.profiles`.

## First Admin

1. In Supabase, open **Authentication > Users**.
2. Create or invite the owner/admin email.
3. After the user exists, copy the user UUID.
4. Run this SQL:

```sql
insert into public.profiles (id, email, full_name, role)
values ('<auth_user_uuid>', '<email>', 'GRF Admin', 'admin')
on conflict (id) do update
set role = 'admin',
    email = excluded.email,
    full_name = excluded.full_name;
```

## Roles

- `admin`: full CMS access, settings, enquiries and user role management.
- `editor`: content management for breeds, birds, gallery, testimonials and FAQs.
- `viewer`: read-only authenticated access to admin content pages.

## Admin URLs

- Login: `/admin/login`
- Dashboard: `/admin`
- Breeds: `/admin/breeds`
- Birds: `/admin/birds`
- Gallery: `/admin/gallery`
- Enquiries: `/admin/enquiries`
- Testimonials: `/admin/testimonials`
- FAQs: `/admin/faqs`
- Settings: `/admin/settings`

## Operational Notes

- Upload only JPEG, PNG or WebP files up to 10 MB.
- Bird images are stored under `birds/{bird_code}/`.
- Breed covers are stored under `breeds/{slug}/`.
- Gallery images are stored under `gallery/{category}/`.
- Public users can insert enquiries, but cannot read them.
- Keep `SUPABASE_SERVICE_ROLE_KEY` out of the frontend and out of Netlify variables that start with `VITE_`.
