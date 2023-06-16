---
id: babel-plugin-syntax-import-meta
title: "@babel/plugin-syntax-import-meta"
sidebar_label: syntax-import-meta
---

:::info
This plugin is included in `@babel/preset-env`, in [ES2020](https://github.com/tc39/proposals/blob/master/finished-proposals.md).
:::

:::tip
You can safely remove this plugin from your Babel config if using `@babel/core` 7.10.0 or above.
:::

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-import-meta
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-import-meta"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-import-meta script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-import-meta"]
});
```

