import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [preact(), cssInjectedByJsPlugin()],
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


