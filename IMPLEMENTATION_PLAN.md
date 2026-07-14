# GRF Growths V2 + Supabase Admin Implementation Plan

## Repository Inspection

### Current Framework And Build
- React 19 + Vite 8 + TypeScript.
- Vite plugins: `@vitejs/plugin-react`, `@tailwindcss/vite`.
- Current scripts:
  - `npm run dev`
  - `npm run dev:api`
  - `npm run dev:all`
  - `npm run lint`
  - `npm run build`
  - `npm run preview`
- Baseline verification on 2026-07-14:
  - `npm run lint`: passing.
  - `npm run build`: passing.

### Current Routing
- The current public app entry is `src/App.tsx`.
- It currently renders a premium GRF Growths single-page public website with anchor sections:
  - `#home`
  - `#intro`
  - `#birds`
  - `#breeds`
  - `#gallery`
  - `#faq`
  - `#contact`
- Legacy React Router pages still exist from the previous commerce app:
  - `src/pages/HomePage.tsx`
  - `src/pages/CollectionsPage.tsx`
  - `src/pages/ProductPage.tsx`
  - `src/pages/CartPage.tsx`
  - `src/pages/CheckoutPage.tsx`
  - `src/pages/SearchPage.tsx`
  - `src/pages/WishlistPage.tsx`
  - `src/pages/AccountPage.tsx`
  - `src/pages/AboutPage.tsx`
  - `src/pages/JournalPage.tsx`
  - `src/pages/AdminPage.tsx`
- These legacy pages are not currently wired into `src/App.tsx`, but they are still compiled and linted.

### Current Styling
- Main active styling lives in `src/index.css`.
- Existing styling uses custom CSS, not Tailwind utility-first markup.
- The public V2 palette is warm cream, charcoal, deep red, earthy brown and muted gold.
- `src/App.css` exists but is not imported by the current app.

### Current Components
- Active public site logic is mostly in `src/App.tsx`.
- Legacy storefront components still exist:
  - `Header`, `Footer`, `MobileNav`, `ProductCard`, `CartDrawer`, `SignInForm`, `SEO`, `Logo`.
- These should not be deleted during admin implementation unless a later cleanup phase intentionally removes the old storefront.

### Existing Content And Images
- Valid GRF Growths business details extracted from V1:
  - Business name: GRF Growths.
  - Phone/WhatsApp: `+91 99529 08818`.
  - Email: `grf.entrepreneur@gmail.com`.
  - Instagram: `https://www.instagram.com/guru_rooster/`.
  - Location: `No.81, Mankanoor, Puthagaram, Tamil Nadu 635602`.
  - Business hours: Monday-Sunday, 6:00 AM-8:00 PM.
  - Known breed labels: Country White, Aseel, Kili Seval, Nattu Seval, Kadaknath, Giriraja.
- GRF assets copied from V1 live site are in `public/grf`.
- Some large phone-origin images are 9-11 MB and should be migrated into Supabase Storage as compressed WebP files in later phases.
- Legacy non-GRF product imagery remains in `public/images` and should not be used in GRF public pages.

### Current Product Or Breed Data
- GRF bird/breed data is currently hardcoded in `src/App.tsx`.
- The hardcoded values intentionally avoid invented exact prices and weights.
- Legacy commerce data remains in `src/data/catalog.ts` and `supabase/schema.sql`.

### Existing Supabase Setup
- `src/lib/supabase.ts` currently creates a client from:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
- `.env.example` currently includes older commerce/backend variables.
- Existing `supabase/schema.sql` and `supabase/seed.sql` are commerce-oriented and should be superseded by new GRF migrations under `supabase/migrations/`.
- Server-side service role usage exists in `server/supabaseAdmin.ts`, but service role keys must never be exposed to Vite frontend code.

### Existing Animation Libraries
- Framer Motion.
- GSAP + ScrollTrigger.
- Lenis smooth scrolling.
- Lucide React icons.

### Netlify Configuration
- No `netlify.toml` currently exists.
- `public/robots.txt` and `public/sitemap.xml` exist.
- SPA redirects still need to be added for direct admin route refreshes.

### Technical Debt And Risks
- `package.json` still has legacy name `atchi-pickles`.
- README is still CAVVE/commerce-oriented.
- Legacy commerce pages are compiled even though not routed.
- Existing Supabase schema is not GRF-specific.
- Current public GRF page is hardcoded and not yet backed by Supabase.
- Current admin page is legacy commerce admin and not secure GRF admin.
- Existing image assets include very large files and need compression/storage migration.

## Implementation Phases

### Phase 1: Stabilise Foundations
- Create shared GRF TypeScript types.
- Update `.env.example` for GRF/Supabase admin variables without secrets.
- Expand `src/lib/supabase.ts` into typed client helpers.
- Create a clear folder structure:
  - `src/features/public`
  - `src/features/admin`
  - `src/features/data`
  - `src/lib`
  - `src/types`
- Keep existing public content intact.
- Verification: `npm run lint`, `npm run build`.

### Phase 2: Supabase Database, RLS And Storage
- Add SQL migrations under `supabase/migrations/`.
- Create GRF tables: `profiles`, `breeds`, `birds`, `bird_images`, `gallery_images`, `enquiries`, `testimonials`, `faqs`, `site_settings`.
- Add updated-at triggers and indexes.
- Enable RLS and role-based policies.
- Add Storage bucket/policy migration for `grf-media`.
- Add safe seed migration using only V1-confirmed content and placeholders where needed.
- Verification: SQL review plus `npm run lint`, `npm run build`.

### Phase 3: Auth And Admin Routing
- Reintroduce React Router with route-level lazy loading.
- Add:
  - `/admin/login`
  - `/admin`
  - `/admin/breeds`
  - `/admin/breeds/new`
  - `/admin/breeds/:id/edit`
  - `/admin/birds`
  - `/admin/birds/new`
  - `/admin/birds/:id/edit`
  - `/admin/gallery`
  - `/admin/enquiries`
  - `/admin/testimonials`
  - `/admin/faqs`
  - `/admin/settings`
- Add Supabase session restoration, role loading, permission checks and protected routes.
- Prevent protected content flash before auth/role checks complete.
- Verification: `npm run lint`, `npm run build`.

### Phase 4: Admin Layout And Dashboard
- Build responsive admin shell with sidebar/drawer, header, breadcrumbs, user badge and logout.
- Add dashboard cards and empty/error/loading states.
- Avoid heavy public-site animation in admin.
- Verification: `npm run lint`, `npm run build`.

### Phase 5: Data Services And Forms
- Add typed query/mutation services for breeds, birds, images, gallery, enquiries, testimonials, FAQs and settings.
- Add React Hook Form + Zod schemas.
- Add reusable image upload/compression/storage service.
- Install only missing required dependencies where needed:
  - `@tanstack/react-query`
  - `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
  - `browser-image-compression`
  - `sonner`
- Verification after each manager: `npm run lint`, `npm run build`.

### Phase 6: Managers
- Breed CRUD.
- Bird CRUD with status, pricing, featured/published states and code suggestion.
- Multiple bird photos with ordering and primary image.
- Gallery CRUD.
- Enquiry manager.
- Testimonials and FAQs managers.
- Settings manager.
- Verification after each manager: `npm run lint`, `npm run build`.

### Phase 7: Public Supabase Integration
- Replace hardcoded public bird/breed/gallery/FAQ data with Supabase queries.
- Preserve fallback V1 content when Supabase is not configured.
- Add public enquiry form with validation, honeypot and cooldown.
- Add reusable WhatsApp links with current page URL.
- Add sold/hidden/published behavior.
- Verification: `npm run lint`, `npm run build`, browser check.

### Phase 8: SEO, Accessibility, Performance And Netlify
- Update metadata and schemas.
- Add canonical URLs and per-route page titles.
- Add focus states, accessible dialogs/forms/carousel controls.
- Add `netlify.toml` and/or `_redirects`.
- Document Netlify env vars and Supabase Auth redirect URLs.
- Review bundle size and route-level splitting.
- Verification: `npm run lint`, `npm run build`, browser check.

### Phase 9: Documentation And Tests
- Create:
  - `MIGRATION_NOTES.md`
  - `ADMIN_SETUP.md`
  - `SUPABASE_SETUP.md`
- Add tests where the current setup supports them. If a test runner is added, keep it focused:
  - WhatsApp message generation.
  - Form validation.
  - Image validation.
  - Price/status display helpers.
  - Route permission helpers.
- Verification:
  - `npm run lint`
  - type checking via `npm run build`
  - unit tests if added
  - production build

## Assumptions
- The V1 contact details and images extracted from `https://grfgrowths.netlify.app/` are the current source of truth.
- Exact prices, customer testimonials, and unverified statistics must not be invented.
- Admin users will be created manually in Supabase Auth and linked with a `profiles` row.
- Supabase service-role keys are backend/manual setup only and will not be used in frontend code.
