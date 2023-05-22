---
id: babel-plugin-syntax-class-properties
title: "@babel/plugin-syntax-class-properties"
sidebar_label: syntax-class-properties
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-transform-class-properties](plugin-transform-class-properties.md) to _both_ parse and transform this syntax.

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-class-properties
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-class-properties"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-class-properties script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-class-properties"]
});
```

