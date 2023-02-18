---
id: babel-plugin-syntax-explicit-resource-management
title: "@babel/plugin-syntax-explicit-resource-management"
sidebar_label: syntax-explicit-resource-management
---

> #### Syntax only
>
> This plugin only enables Babel to parse this syntax. Babel does not support transforming this syntax

This plugin enables Babel to parse using declarations:

```js title="JavaScript"
using handler = await read();
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-explicit-resource-management
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-explicit-resource-management"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-explicit-resource-management script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-explicit-resource-management"]
});
```
