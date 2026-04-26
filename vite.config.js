import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  plugins: [react({ fastRefresh: false }), tailwindcss()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn'],
      },
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        proyectos: resolve(__dirname, 'proyectos/index.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/scheduler')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) {
            return 'motion';
          }
        },
      },
    },
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    sourcemap: false,
  },
})
