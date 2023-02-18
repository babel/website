---
id: babel-plugin-syntax-export-namespace-from
title: "@babel/plugin-syntax-export-namespace-from"
sidebar_label: syntax-export-namespace-from
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-export-namespace-from](plugin-proposal-export-namespace-from.md) to _both_ parse and transform this syntax.

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-export-namespace-from
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-export-namespace-from"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-export-namespace-from script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-export-namespace-from"]
});
```

