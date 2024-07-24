import { defineConfig } from 'vite';
import path from 'path';
import strip from '@rollup/plugin-strip';
import  terser  from '@rollup/plugin-terser';

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.js'),
			name: 'ParticlesFactory',
			fileName: (format) => `particles-factory.${format}.js`,
			formats: [ 'es', 'umd' ],
		},
		rollupOptions: {
			plugins: [
				// Remove console statements and comments
				strip({
					include: '**/*.js',
					functions: [ 'console.*', 'assert.*' ],
					debugger: true,
				}),
				// Minify the code with terser
				terser({
					format: {
						comments: false, // Remove comments
						beautify: false, // Ensure output is not beautified
						indent_level: 0, // No indentation
						//preserve_line_breaks: false // Remove line breaks
					},
					compress: {
						drop_console: true, // Remove console statements
						drop_debugger: true, // Remove debugger statements
						passes: 3, // Number of compress passes to further optimize the code
						reduce_funcs: true, // Reduce function size
						reduce_vars: true, // Reduce variable size

						unsafe_comps: true, // Optimize comparisons
						unsafe_math: true, // Optimize math operations
						unsafe_symbols: true, // Allow symbols to be mangled
					},
					mangle: {
						toplevel: true, // Mangle top-level variables and functions
						// properties: {
						// 	regex: /^[a-z_$][a-z_$0-9A-Z]*$/i, // Mangle properties that match this regex
						// 	reserved: [] // Do not mangle these property names
						// },
						//keep_classnames: false, // Allow class names to be mangled
						keep_fnames: true, // Allow function names to be mangled
					},
					// Additional options to ensure maximum compression
					module: true,
					toplevel: true,
					safari10: true
				}),
			],
			output: {
				exports: 'named',
			},
		},
	},
});
