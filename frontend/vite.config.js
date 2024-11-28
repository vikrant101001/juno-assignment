import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 80, // Render will assign a port, fallback to 80
    host: '0.0.0.0', // Make sure it listens on all interfaces
  }
})
