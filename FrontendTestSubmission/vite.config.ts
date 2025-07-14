import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: 'localhost'
  },
  resolve: {
    alias: {
      'shared/logger': path.resolve(__dirname, '../LoggingMiddleware/logger.ts')
    }
  }
})
