import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [reactRouter()],
  resolve: {
    alias: {
      '@': path.resolve(rootDirectory, 'src'),
      '~': path.resolve(rootDirectory, 'app'),
    },
  },
});
