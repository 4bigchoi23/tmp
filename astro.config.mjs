// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  integrations: [react()],
  vite: {
    define: {
        "process.env": process.env
    }
  },
});