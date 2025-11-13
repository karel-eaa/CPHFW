import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Base URL for GitHub Pages - change 'CPHFW' to your repo name if different
  base: '/CPHFW/',
  
  build: {
    // Output to dist folder
    outDir: 'dist',
    
    // Multi-page app configuration
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        event: resolve(__dirname, 'event.html'),
        eventlist: resolve(__dirname, 'eventlist.html'),
        map: resolve(__dirname, 'map.html'),
        schedule: resolve(__dirname, 'schedule.html'),
      },
    },
  },
  
  // Ensure assets are properly handled
  publicDir: 'public',
})

