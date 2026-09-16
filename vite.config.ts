import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://<user>.github.io/e-lovu/ on GitHub Pages. The Pages
  // build always sets GITHUB_ACTIONS=true, so local dev keeps the root base.
  base: process.env.GITHUB_ACTIONS ? '/e-lovu/' : '/',
  plugins: [react(), tailwindcss()],
})

