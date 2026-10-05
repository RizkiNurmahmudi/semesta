import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      'packages/*/src/**/*.test.ts',
      'packages/*/src/**/*.test.tsx',
      'apps/web/src/**/*.test.ts',
      'apps/web/src/**/*.test.tsx',
      'tools/*/src/**/*.test.ts',
    ],
    environment: 'node',
  },
})
