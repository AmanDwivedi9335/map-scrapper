import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),

    viteStaticCopy({
      targets: [
        {
          src: 'src/manifest.json',
          dest: '.',
        },
        {
          src: 'public/icons',
          dest: '.',
        },
      ],
    }),
  ],

  build: {
    rollupOptions: {
      input: {
        sidepanel: 'sidepanel.html',
        background: 'src/background/serviceWorker.ts',
        content: 'src/content/index.ts',
      },

      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'assets/[name].js',
      },
    },
  },
});