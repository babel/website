---
id: babel-plugin-syntax-import-reflection
title: "@babel/plugin-syntax-import-reflection"
sidebar_label: syntax-import-reflection
---

:::note
#### Syntax only

This plugin only enables Babel to parse this syntax. Babel does not support transforming this syntax
:::

This plugin enables Babel to parse import reflections:

```js title="JavaScript"
import module foo from "./foo.wasm";
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-import-reflection
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-import-reflection"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-import-reflection script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-import-reflection"]
});
```
