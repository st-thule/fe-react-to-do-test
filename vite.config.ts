import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      /**
       * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
       * @default /app/App.tsx
       */
      entry: '/app/App.tsx',
      /**
       * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
       * @default index.html
       */
      template: 'index.html',
    }),
  ],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@config': path.resolve(__dirname, './src/config'),
      '@stylesheet': path.resolve(__dirname, './src/app/stylesheet'),
      '@shared': path.resolve(__dirname, './src/app/shared'),
      '@core': path.resolve(__dirname, './src/app/core'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
});
