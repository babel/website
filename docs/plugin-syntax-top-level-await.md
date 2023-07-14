---
id: babel-plugin-syntax-top-level-await
title: "@babel/plugin-syntax-top-level-await"
sidebar_label: syntax-top-level-await
---

:::info
This plugin is included in `@babel/preset-env`, in [ES2022](https://github.com/tc39/proposals/blob/master/finished-proposals.md).
:::

:::note
#### Syntax only

This plugin only enables parsing of this feature. Babel doesn't support transforming
top-level await, but you can use Rollup's `experimentalTopLevelAwait` or webpack@5's
`experiments.topLevelAwait` options.
:::

:::tip
You can safely remove this plugin from your Babel config if using `@babel/core` 7.15.0 or above.
:::

```js title="JavaScript"
const val = await promise;

export { val };
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-top-level-await
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-top-level-await"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-top-level-await script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync(code, {
  plugins: ["@babel/plugin-syntax-top-level-await"],
});
```
