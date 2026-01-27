import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Uncomment for GitHub Pages deployment (replace with your repo name)
  // base: '/CrisWebsite/',
  server: {
    port: 5173,
    open: true
  }
})
