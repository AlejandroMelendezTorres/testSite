import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite.config.js
// Configuration for Vite. Keeps a minimal setup with the React plugin.
// Extend here for environment-specific options, proxies, or optimization tweaks.
export default defineConfig({
  plugins: [react()],
})
