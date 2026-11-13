import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'happy-dom',
		setupFiles: ['./test/setup.ts'],
		coverage: {
			// The lcov paths start at the repository root, so that Codecov finds each file.
			reporter: ['text', 'json', ['lcov', { projectRoot: '../..' }]],
			exclude: [
				'dist/**',
				'vitest.config.ts',
				'tsup.config.ts',
				'src/types.ts',
				'src/index.ts',
			],
		},
	},
});
