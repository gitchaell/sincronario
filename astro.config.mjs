import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: vercel({
		// Analytics enabled via component in src/pages/index.astro
	}),
	vite: {
		plugins: [tailwindcss()]
	}
})