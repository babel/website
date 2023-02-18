---
id: babel-plugin-syntax-export-default-from
title: "@babel/plugin-syntax-export-default-from"
sidebar_label: syntax-export-default-from
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-export-default-from](plugin-proposal-export-default-from.md) to _both_ parse and transform this syntax.

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-export-default-from
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-export-default-from"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-export-default-from script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-export-default-from"]
});
```

