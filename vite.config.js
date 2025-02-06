import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: false,  // Disable strict port checking
    host: '0.0.0.0',
    allowedHosts: ['admin.tourforsoul.in','localhost']
  }
})
