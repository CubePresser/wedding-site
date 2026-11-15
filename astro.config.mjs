// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // Build faqs.html rather than faqs/index.html, so Cloudflare serves /faqs without redirecting to /faqs/.
  build: { format: 'file' },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'The Seasons',
      cssVariable: '--font-display',
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/the-seasons.woff2'],
            weight: 400,
            style: 'normal',
          },
        ],
      },
    },
    // Closest Google Fonts to the mockup. Swap these here if you license the originals.
    {
      provider: fontProviders.google(),
      name: 'Pinyon Script',
      cssVariable: '--font-script',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Montserrat',
      cssVariable: '--font-body',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
});
