<script setup>
import packageJson from '../../packages/react/package.json'

const viemVersion = packageJson.peerDependencies.viem
</script>

# Installation

Install Wagmi via your package manager, a `<script>` tag, or build from source.

## Package Manager

Install the required packages.

::: code-group
```bash-vue [pnpm]
pnpm add wagmi@beta viem@{{viemVersion}} @tanstack/react-query
```

```bash-vue [npm]
npm install wagmi@beta viem@{{viemVersion}} @tanstack/react-query
```

```bash-vue [yarn]
yarn add wagmi@beta viem@{{viemVersion}} @tanstack/react-query
```

```bash-vue [bun]
bun add wagmi@beta viem@{{viemVersion}} @tanstack/react-query
```
:::

- [Viem](https://viem.sh) is a TypeScript interface for Ethereum that performs blockchain operations.
- [TanStack Query](https://tanstack.com/query/v5) is an async state manager that handles requests, caching, and more.
- [TypeScript](/react/typescript) is optional, but highly recommended. Learn more about [TypeScript support](/react/typescript).

## CDN

If you're not using a package manager, you can also use Wagmi via an ESM-compatible CDN such as [esm.sh](https://esm.sh). Simply add a `<script type="module">` tag to the bottom of your HTML file with the following content.

```html-vue
<script type="module">
  import React from 'https://esm.sh/react@18.2.0'
  import { QueryClient } from 'https://esm.sh/@tanstack/react-query'
  import { createClient } from 'https://esm.sh/viem@{{viemVersion}}'
  import { createConfig } from 'https://esm.sh/wagmi@beta'
</script>
```

Check out the React docs for info on how to use [React without JSX](https://react.dev/reference/react/createElement#creating-an-element-without-jsx).

## Requirements

Wagmi is optimized for modern browsers. It is compatible with the following browsers.

- Chrome 64+
- Edge 79+
- Firefox 67+
- Opera 51+
- Safari 12+

::: tip
Depending on your environment, you might need to add polyfills. See [Viem Platform Compatibility](https://viem.sh/docs/compatibility.html) for more info.
:::

## Using Unreleased Commits

If you can't wait for a new release to test the latest features, you can either install from the `canary` tag (tracks the [`main`](https://github.com/wevm/wagmi/tree/main) branch).

::: code-group
```bash [pnpm]
pnpm add wagmi@canary
```

```bash [npm]
npm install wagmi@canary
```

```bash [yarn]
yarn add wagmi@canary
```

```bash [bun]
bun add wagmi@canary
```
:::

Or clone the [Wagmi repo](https://github.com/wevm/wagmi) to your local machine, build, and link it yourself.

```bash
gh repo clone wevm/wagmi
cd wagmi
pnpm install
pnpm build
cd packages/react
pnpm link --global
```

Then go to the project where you are using Wagmi and run `pnpm link --global wagmi` (or the package manager that you used to link Wagmi globally). Make sure you installed the [required peer dependencies](/react/getting-started#manual-installation) and their versions are correct.
