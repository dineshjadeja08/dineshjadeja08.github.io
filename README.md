# Dinesh Kumar Portfolio Website

A high-performance, personal freelancer portfolio website built from scratch for **Dinesh Kumar (Dineshkumar Chandrasekaran)**. This project has a warm cream aesthetic, black text, and peach highlights, recreating an editorial layouts design.

---

## 🛠 Tech Stack

- **Framework**: React 19 (via Vite 8)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first configuration with `@tailwindcss/vite` integration)
- **Animations**: Framer Motion
- **Routing**: React Router DOM (with automatic window scroll-to-top on route shifts)
- **Forms**: React Hook Form + Zod (for validation)
- **Icons**: Lucide React
- **Hosting**: Pre-configured for deployment on Netlify

---

## 📁 Folder Structure

```
dk-port/
├── public/                 # Static public assets
│   ├── favicon.svg         # Minimalist initials favicon
│   ├── robots.txt          # SEO crawlers instructions
│   └── sitemap.xml         # SEO XML sitemap index
├── src/
│   ├── assets/             # Images and local binary assets
│   │   └── images/
│   │       ├── dinesh-portrait.webp   # Main portrait image (placeholder fallback active)
│   │       └── projects/              # Project screenshot placeholders
│   ├── components/         # Reusable modules
│   │   ├── booking/        # Cal.com modal, triggers, and option cards
│   │   ├── common/         # Image loading fallback and SEO meta tag components
│   │   ├── forms/          # Zod validated contact enquiry forms
│   │   └── layout/         # Header Navigation and Footer components
│   ├── config/             # Environment values mappings and Cal.com configurations
│   ├── data/               # Structured timeline, FAQs, skills, and projects data arrays
│   ├── hooks/              # Context triggers (e.g., booking overlay controls)
│   ├── lib/                # WhatsApp link generators and analytics mock tracking
│   ├── App.tsx             # Main client routes configuration
│   ├── index.css           # Google fonts loading, scrollbars, and Tailwind rules
│   ├── main.tsx            # DOM root mounting entry point
│   └── vite-env.d.ts       # Type helpers for environment variables
├── .env.example            # Environment variables template
├── .gitignore              # Git ignored files & secret folders
├── index.html              # HTML shell containing hidden Netlify Form hooks
├── netlify.toml            # Netlify builds and client routing redirects configuration
├── package.json            # Active npm scripts and dependencies
├── tsconfig.json           # Global compiler settings
└── README.md               # Setup and customization manual (This file)
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Fill in the parameters as desired:

```env
# Production deployment site URL
VITE_SITE_URL=https://your-custom-domain.netlify.app

# Personal details (leave blank to hide corresponding buttons)
VITE_EMAIL=dineshkumarc@example.com
VITE_WHATSAPP_NUMBER=919876543210

# Booking call coordinates
VITE_CAL_30MIN_LINK=https://cal.com/dineshkumarc/30min
VITE_CAL_15MIN_LINK=https://cal.com/dineshkumarc/15min

# Social channels (leave blank to hide corresponding links)
VITE_LINKEDIN_URL=https://linkedin.com/in/dineshkumar
VITE_GITHUB_URL=https://github.com/dineshkumar
VITE_INSTAGRAM_URL=https://instagram.com/dineshkumar
```

*Note: The website is configured to safely hide any buttons associated with missing environment keys instead of rendering broken links.*

---

## 🚀 Commands Manual

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Local Dev Server
```bash
npm run dev
```

### 3. Build Production Bundle
```bash
npm run build
```

### 4. Preview Local Production Build
```bash
npm run preview
```

---

## ✍️ Customization Guidelines

### 1. How to Replace Your Profile Portrait
Save your portrait as a WebP image to:
`src/assets/images/dinesh-portrait.webp`

If this image is missing, the site will automatically render a stylized, accessible cream-and-peach monogram card containing your initials **"DK"**.

### 2. How to Add Project Screenshots
Save project images to the following paths:
- GRF Growths: `src/assets/images/projects/grf-growths.webp`
- LinkSync: `src/assets/images/projects/linksync.webp`
- CAVVE: `src/assets/images/projects/cavve.webp`
- XenFirm: `src/assets/images/projects/xenfirm.webp`
- ClientEase: `src/assets/images/projects/clientease.webp`
- Employee API: `src/assets/images/projects/employee-api.webp`
- SpamGuard: `src/assets/images/projects/spamguard.webp`
- QRNow: `src/assets/images/projects/qrnow.webp`

If any image file is missing, the custom `<Image />` component renders a clean placeholder box displaying the project's name.

### 3. How to Update Projects
All project contents (narrative summary, role, features list, challenges, and live URLs) are located in `src/data/projects.ts`. You can modify the array fields here.

### 4. How to Add Testimonials Later
Testimonials are disabled by default when the database array is empty. To show review cards:
1. Open `src/data/testimonials.ts`.
2. Add objects matching the `Testimonial` interface:
   ```typescript
   export const testimonials: Testimonial[] = [
     {
       id: "1",
       name: "Client Name",
       role: "Founder",
       company: "GRF Growths",
       content: "Dinesh delivered a beautiful, responsive site on time...",
       image: "/src/assets/images/testimonials/client1.webp" // Optional
     }
   ];
   ```
The section will instantly reveal itself on the homepage.

---

## ⚡ Netlify Forms Integration

This site uses static Netlify Forms to process submissions:
1. A hidden static form mimicking the enquiry inputs is embedded in `index.html` under the name `project-enquiry`.
2. The visible React form in `src/components/forms/ContactForm.tsx` triggers a `POST` request with urlencoded body data to the root endpoint (`/`).
3. Netlify automatically parses these submissions without requiring custom backend servers.

---

## 🛠 Troubleshooting

- **HTML Target Script Error**: Ensure that `index.html` references `<script type="module" src="/src/main.tsx"></script>`. Never change this pointer to a `.jsx` extension as it breaks TypeScript builds.
- **Form Not Capturing Submissions**: Ensure that `data-netlify="true"` and `name="project-enquiry"` attributes are present on both the visible React form tag and the hidden form element in `index.html`.
