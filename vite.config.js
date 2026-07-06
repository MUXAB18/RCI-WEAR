import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Build optimization
  build: {
    outDir: 'dist',
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    
    // Optimization
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
  },
  
  // Server optimization
  server: {
    middlewareMode: false,
    preTransformRequests: true,
  },
  
  // Optimization hints
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'gsap',
      'lenis',
    ],
  },
})
