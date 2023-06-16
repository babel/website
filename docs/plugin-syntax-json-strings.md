---
id: babel-plugin-syntax-json-strings
title: "@babel/plugin-syntax-json-strings"
sidebar_label: syntax-json-strings
---

:::note
#### Syntax only

It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-transform-json-strings](plugin-transform-json-strings.md) to _both_ parse and transform this syntax.
:::

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-json-strings
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-json-strings"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-json-strings script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-json-strings"]
});
```

