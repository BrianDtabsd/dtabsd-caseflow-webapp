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
    include: ['yup'],
    exclude: [
      '@aws-amplify/ui-react',
      '@aws-amplify/core',
      '@aws-amplify/auth',
      '@aws-amplify/api',
      '@aws-amplify/storage',
      '@aws-amplify/predictions',
      '@aws-amplify/data-schema-types'
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      platform: 'browser',
      supported: {
        'top-level-await': true
      }
    }
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components')
    },
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.js', '.mjs', '.ts', '.tsx', '.json']
  },
  ssr: {
    noExternal: ['@aws-amplify/*']
  }
})
