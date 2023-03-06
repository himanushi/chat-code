import adapter from '@sveltejs/adapter-static';
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
		// ref: https://github.com/sveltejs/language-tools/issues/650#issuecomment-1181354795
		if (warning.code.startsWith('a11y-')) {
			return;
		}
		handler(warning);
	}
};

export default config;
