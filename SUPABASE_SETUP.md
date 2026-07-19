# Supabase Setup

## Environment Variables

Frontend variables:

```env
VITE_SITE_URL=https://your-domain.example
VITE_GRF_WHATSAPP_NUMBER=919952908818
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_STORAGE_BUCKET=grf-media
```

Optional server-only variables for legacy backend routes:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## SQL Setup

Apply the migration files in `supabase/migrations` in timestamp order. They create:

- GRF content tables
- profile roles
- RLS policies
- public Storage bucket `grf-media`
- starter content

## Storage

The migration creates a public bucket named `grf-media`.

Storage policy summary:

- Anyone can read published public media.
- Authenticated `admin` and `editor` users can upload, update and delete media.
- Uploaded admin images are compressed to WebP in the browser before upload.

## Auth Settings

- Enable email login in Supabase Auth.
- Disable public self-signup if the project should remain staff-only.
- Add the production URL and local URL to Auth redirect URLs:
  - `http://localhost:5173`
  - `https://your-netlify-site.netlify.app`
  - your custom domain, if used

## Security Checklist

- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client code.
- Keep public insert access limited to `enquiries`.
- Confirm RLS is enabled on every GRF table after migrations.
- Promote the first admin manually using the SQL in `ADMIN_SETUP.md`.
