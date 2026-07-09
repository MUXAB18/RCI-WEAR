import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    outDir: 'dist',
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
    },
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,

    rollupOptions: {
      output: {
        /**
         * Manual chunks — split heavy libraries out of the initial bundle.
         * Three.js alone is ~600KB; putting it in its own async chunk means
         * the initial page load doesn't have to parse it at all.
         */
        manualChunks(id) {
          // Three.js ecosystem — loaded only when HeroCanvas mounts (desktop)
          if (
            id.includes('three') ||
            id.includes('@react-three') ||
            id.includes('@react-spring/three')
          ) {
            return 'three-vendor'
          }

          // GSAP animation library — dynamic import, split out
          if (id.includes('gsap')) {
            return 'gsap-vendor'
          }

          // Lenis smooth scroll
          if (id.includes('lenis') || id.includes('@studio-freight')) {
            return 'lenis-vendor'
          }

          // EmailJS — only used in contact form
          if (id.includes('@emailjs')) {
            return 'emailjs-vendor'
          }

          // React core — keep together
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor'
          }
        },
      },
    },
  },

  server: {
    middlewareMode: false,
    preTransformRequests: true,
  },

  // Pre-bundle only what's needed for initial render
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
    ],
    // Exclude heavy optional deps from pre-bundle (loaded async)
    exclude: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      '@react-spring/three',
    ],
  },
})
