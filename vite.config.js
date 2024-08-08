import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';
import path from 'path';

export default defineConfig({
  build: {
    outDir: `dist-${path.basename(process.cwd())}`,
    rollupOptions: {
      input: {
        welcome: 'index.html', // use if open index in new tab via js
        rating: '../utils/module-rating.js',
        settings: '../utils/module-settings.js',
      },
    },
  },
  plugins: [crx({ manifest })],
});
