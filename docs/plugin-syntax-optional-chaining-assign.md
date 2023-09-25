---
id: babel-plugin-syntax-optional-chaining-assign
title: "@babel/plugin-syntax-optional-chaining-assign"
sidebar_label: syntax-optional-chaining-assign
---

:::note
#### Syntax only

It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-optional-chaining-assign](plugin-proposal-optional-chaining-assign.md) to _both_ parse and transform this syntax.
:::

This plugin enables parsing for `obj?.prop = val;` assignments.

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-optional-chaining-assign
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-optional-chaining-assign"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-optional-chaining-assign script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-optional-chaining-assign"]
});
```

