import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		alias: {
			'~': 'src'
		},
		adapter: adapter({
			// SPA mode
			fallback: 'index.html'
		}),
		prerender: { entries: [] }
	},

	onwarn: (warning, handler) => {
		if (warning.code.startsWith('a11y-')) return;
		handler(warning);
	}
};

export default config;
