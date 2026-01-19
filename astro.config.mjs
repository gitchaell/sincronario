<<<<<<< HEAD
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()]
	}
})
=======
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  vite: {
    plugins: [tailwindcss()]
  }
});
>>>>>>> b166f34 (feat: enhance Dreamspell page with responsive UI, analytics, and rich details)
