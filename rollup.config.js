import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
const path = require('path');

const production = false;

export default {
	input: path.resolve(__dirname, './src/index.js'),
	output: {
		sourcemap: true,
		format: 'cjs',
		name: 'app',
		file: 'build/index.js'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,

			generate: 'ssr',
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('build/bundle.css');
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		json(),
		resolve({browser: false}),
		commonjs(),
		replace({
      		'process.env.NODE_ENV': JSON.stringify('development'),
    	}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	]
};