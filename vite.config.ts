import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('react')) return 'react'
          if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) return 'animation'
          if (id.includes('@supabase')) return 'supabase'
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) return 'forms'
          if (id.includes('@tanstack')) return 'query'
          return 'vendor'
        },
      },
    },
  },
})
