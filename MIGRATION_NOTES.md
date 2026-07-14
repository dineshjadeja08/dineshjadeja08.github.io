# Migration Notes

This project was migrated from a legacy CAVVE/Atchi commerce scaffold into the GRF Growths public site and Supabase-backed admin CMS.

## What Changed

- The routed app now serves the GRF Growths public landing/catalogue experience at `/`.
- Protected CMS routes live under `/admin`.
- Supabase now manages GRF domain data: breeds, birds, bird images, gallery images, enquiries, testimonials, FAQs, site settings and admin profiles.
- Public content is read from Supabase when configured and falls back to bundled GRF assets when it is not.
- Public enquiries insert into Supabase and use WhatsApp as the operational fallback.
- Admin uploads are compressed to WebP before they are written to Supabase Storage.

## Database Migration Order

Run these SQL files in order:

1. `supabase/migrations/202607140001_grf_schema.sql`
2. `supabase/migrations/202607140002_grf_rls.sql`
3. `supabase/migrations/202607140003_grf_storage.sql`
4. `supabase/migrations/202607140004_grf_seed.sql`

The seed file creates starter rows and references sample storage paths. Upload final production images through the admin UI or Supabase Storage before launch.

## Legacy Files

Legacy commerce components, pages, server handlers and SQL files remain in the repository for now, but they are not part of the GRF public/admin route surface. Remove them in a later cleanup pass only after confirming Razorpay, Shiprocket and old commerce flows are no longer needed.

## Verification

After migrations and environment variables are configured:

```bash
npm run lint
npm run test
npm run build
```
