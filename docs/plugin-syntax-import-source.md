---
id: babel-plugin-syntax-import-source
title: "@babel/plugin-syntax-import-source"
sidebar_label: syntax-import-source
---

:::note
#### Syntax only

It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-import-source](plugin-proposal-import-source.md) to _both_ parse and transform this syntax.
:::

This plugin enables parsing for `import source` declarations.

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-import-source
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-import-source"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-import-source script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-import-source"]
});
```

