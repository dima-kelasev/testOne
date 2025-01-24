import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(), commonjs()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  server: {
    port: 5000,
    open: true,
    cors: true,
  },

  build: {
    target: 'esnext',
    sourcemap: true,
    minify: 'esbuild',
    chunkSizeWarningLimit: 500,
  },

  envDir: './config',
});
function commonjs(): import('vite').PluginOption {
  throw new Error('Function not implemented.');
}
