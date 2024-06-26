import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'pageBuilder',
      remotes: {
        pageBuilder: 'https://page-builder-io.netlify.app/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom', 'jotai', 'tldraw']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
