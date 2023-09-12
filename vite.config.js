import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    root: '.',
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      enabled: true,
      include: ['src/**/*.{js,jsx}', '!src/types.ts'],
      all: true,
      reporter: ['text', 'json']
    },
    useAtomics: true,
    setupFiles: ['./src/tests/setup.js'],
    restoreMocks: true,
    sequence: {
      shuffle: true
    }
  },
})
