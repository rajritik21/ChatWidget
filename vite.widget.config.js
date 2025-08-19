import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
// Remove css-injected plugin; we'll fetch CSS file at runtime to keep Shadow DOM isolation

export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: 'src/widget.js',
      name: 'ChatBotWidget',
      formats: ['iife'],
      fileName: () => 'chatbot-widget.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    target: 'es2019',
    sourcemap: false,
    minify: true,
    outDir: 'dist-widget',
    emptyOutDir: true,
  },
});


