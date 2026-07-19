/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_EMAIL?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_CAL_30MIN_LINK?: string;
  readonly VITE_CAL_15MIN_LINK?: string;
  readonly VITE_LINKEDIN_URL?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_INSTAGRAM_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
