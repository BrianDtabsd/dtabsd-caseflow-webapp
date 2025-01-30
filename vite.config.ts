import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: [
      '@aws-amplify/core',
      '@aws-amplify/auth',
      '@aws-amplify/api',
      '@aws-amplify/storage',
      '@aws-amplify/ui-react'
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
      '@aws-amplify/data-schema-types': path.resolve(__dirname, 'node_modules/@aws-amplify/data-schema-types/lib-esm'),
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components')
    }
  }
})
