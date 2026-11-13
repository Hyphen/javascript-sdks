![Hyphen AI](https://github.com/Hyphen/javascript-sdks/raw/main/logo.png)

[![tests](https://github.com/Hyphen/javascript-sdks/actions/workflows/tests.yaml/badge.svg)](https://github.com/Hyphen/javascript-sdks/actions/workflows/tests.yaml)
[![codecov](https://codecov.io/gh/Hyphen/javascript-sdks/graph/badge.svg)](https://codecov.io/gh/Hyphen/javascript-sdks)
[![license](https://img.shields.io/github/license/Hyphen/javascript-sdks)](https://github.com/Hyphen/javascript-sdks/blob/main/LICENSE)

# Hyphen JavaScript SDKs

This repository contains the [Hyphen](https://hyphen.ai) SDKs for JavaScript. It is a `pnpm` workspace. Each SDK is a package in the `packages` directory.

# Packages

| Package | Directory | Description |
|----------------|----------------|----------------|
| [@hyphen/sdk](https://www.npmjs.com/package/@hyphen/sdk) | [packages/nodejs-sdk](./packages/nodejs-sdk) | The Hyphen SDK for Node.js |
| [@hyphen/browser-sdk](https://www.npmjs.com/package/@hyphen/browser-sdk) | [packages/browser-sdk](./packages/browser-sdk) | The Hyphen SDK for the browser |
| [@hyphen/react-sdk](https://www.npmjs.com/package/@hyphen/react-sdk) | [packages/react-sdk](./packages/react-sdk) | The Hyphen SDK for React |

Each package has a `README.md` file that shows how to install and use the package.

The packages use each other in the workspace:

- `@hyphen/react-sdk` uses `@hyphen/browser-sdk`.
- The tests of `@hyphen/browser-sdk` use `@hyphen/sdk`.

# Development

Use `pnpm` for all commands. Do not use `npm`.

Run these commands from the root of the repository. Each command runs in all packages.

| Command | Description |
|----------------|----------------|
| `pnpm install` | Installs the dependencies of all packages |
| `pnpm build` | Builds all packages |
| `pnpm lint` | Runs the Biome linter and applies the fixes |
| `pnpm test` | Builds all packages, then runs the linter and the tests with coverage |
| `pnpm test:ci` | Builds all packages, then runs the linter with no fixes and the tests with coverage |
| `pnpm clean` | Removes the `dist`, `node_modules`, and `coverage` directories |

To run a command in one package, use a filter:

```bash
pnpm --filter @hyphen/browser-sdk test
```

Some tests call the Hyphen API. The [Node.js SDK README](./packages/nodejs-sdk/README.md#testing-your-changes) gives the environment variables that these tests need. Put the `.env` file in the directory of the package that you test.

# Releases

Each package has its own version. To release a package, do these steps:

1. Set the new version in the `package.json` file of the package.
2. Merge the change into the `main` branch.
3. Publish a GitHub release.

The `release` workflow then stages each package that has a version that is not on npm. A maintainer promotes each staged version on npm.

# Contributing

We welcome contributions. Follow the [Contributing](./CONTRIBUTING.md) guidelines and our [Code of Conduct](./CODE_OF_CONDUCT.md).

To report a security problem, follow the [Security Policy](./SECURITY.md).

# License and Copyright

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
