import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@mocks', replacement: path.resolve(__dirname, 'src/@mocks') },
      { find: '@app', replacement: path.resolve(__dirname, 'src/app') }
    ]
  },
  server: {
    open: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true
  }
});
