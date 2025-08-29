import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [preact(), tailwindcss()],
  base: '/ChatWidget/',
  build: {
    outDir: 'dist-demo',
    emptyOutDir: true,
  },
});
