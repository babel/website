---
id: babel-plugin-syntax-function-bind
title: "@babel/plugin-syntax-function-bind"
sidebar_label: syntax-function-bind
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-function-bind](plugin-proposal-function-bind.md) to _both_ parse and transform this syntax.

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-function-bind
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-function-bind"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-function-bind script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-function-bind"]
});
```

