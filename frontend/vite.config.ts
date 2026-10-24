import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function spaRoutesPlugin(): Plugin {
  return {
    name: 'spa-routes-fallback',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      const indexHtmlPath = path.join(distDir, 'index.html')
      if (!fs.existsSync(indexHtmlPath)) return

      const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8')

      // 1. Generate 404.html (Render's automatic fallback for unknown paths on static sites)
      fs.writeFileSync(path.join(distDir, '404.html'), indexHtml, 'utf-8')

      // 2. Pre-generate static route index.html files so direct access / refresh
      // resolves as a physical file on Render without requiring dashboard rewrite rules.
      const routes = [
        'login',
        'students',
        'journey',
        'interventions',
        'analytics',
        'csv-hub',
        'help',
      ]

      for (const route of routes) {
        const routeDir = path.join(distDir, route)
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true })
        }
        fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml, 'utf-8')
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), spaRoutesPlugin()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
