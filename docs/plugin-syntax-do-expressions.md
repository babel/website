---
id: babel-plugin-syntax-do-expressions
title: "@babel/plugin-syntax-do-expressions"
sidebar_label: syntax-do-expressions
---

:::note
#### Syntax only

It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-do-expressions](plugin-proposal-do-expressions.md) to _both_ parse and transform this syntax.
:::

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-do-expressions
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-do-expressions"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-do-expressions script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-do-expressions"]
});
```

