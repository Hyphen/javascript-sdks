import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		sequence: {
			concurrent: false, // run tests in each file sequentially
		},
		coverage: {
			// The lcov paths start at the repository root, so that Codecov finds each file.
			reporter: ['text', 'json', ['lcov', { projectRoot: '../..' }]],
			exclude: [
				'dist/**',
				'src/index.ts',
				'vitest.config.ts',
				'src/link-stats-type.ts',
			],
		},
	},
});
