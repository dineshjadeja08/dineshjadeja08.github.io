# GRF Growths

Premium React + Vite site for GRF Growths, with a cinematic public rooster catalogue and a protected Supabase admin CMS for breeds, birds, gallery content, enquiries, testimonials, FAQs and settings.

## Stack

- React, Vite and TypeScript
- React Router, TanStack Query, React Hook Form and Zod
- Framer Motion, GSAP ScrollTrigger and Lenis
- Supabase Auth, Postgres RLS and Storage
- Netlify-ready SPA deployment

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Frontend: `http://localhost:5173`

## Required Environment

```env
VITE_SITE_URL=http://localhost:5173
VITE_GRF_WHATSAPP_NUMBER=919952908818
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SUPABASE_STORAGE_BUCKET=grf-media
```

`VITE_SUPABASE_PUBLISHABLE_KEY` is also supported for compatibility, but `VITE_SUPABASE_ANON_KEY` is preferred.

## Supabase

Run the migrations in `supabase/migrations` in order:

```txt
202607140001_grf_schema.sql
202607140002_grf_rls.sql
202607140003_grf_storage.sql
202607140004_grf_seed.sql
```

Then create the first admin user in Supabase Auth and grant the `admin` role in `public.profiles`. See `SUPABASE_SETUP.md` and `ADMIN_SETUP.md`.

## Routes

- `/` public GRF Growths site
- `/admin/login` admin login
- `/admin` dashboard
- `/admin/breeds`
- `/admin/birds`
- `/admin/gallery`
- `/admin/enquiries`
- `/admin/testimonials`
- `/admin/faqs`
- `/admin/settings`

## Verification

```bash
npm run lint
npm run test
npm run build
```

## Netlify

The app includes `netlify.toml` and `public/_redirects` for SPA fallback routing. Configure the `VITE_*` variables in Netlify before deploying.

## Notes

Legacy commerce files are still present but are not routed through the GRF public/admin app. They can be removed in a dedicated cleanup pass after the GRF launch is signed off.
