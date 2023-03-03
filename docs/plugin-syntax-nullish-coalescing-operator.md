---
id: babel-plugin-syntax-nullish-coalescing-operator
title: "@babel/plugin-syntax-nullish-coalescing-operator"
sidebar_label: syntax-nullish-coalescing-operator
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-nullish-coalescing-operator](plugin-proposal-nullish-coalescing-operator.md) to _both_ parse and transform this syntax.

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-nullish-coalescing-operator
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-nullish-coalescing-operator"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-nullish-coalescing-operator script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-nullish-coalescing-operator"]
});
```

