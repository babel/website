---
id: babel-plugin-syntax-async-explicit-resource-management
title: "@babel/plugin-syntax-async-explicit-resource-management"
sidebar_label: syntax-async-explicit-resource-management
---

> #### Syntax only
>
> This plugin only enables Babel to parse this syntax. Babel does not support transforming this syntax

This plugin enables Babel to parse await using declarations:

```js title="JavaScript"
await using handler = await read();
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-async-explicit-resource-management
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-async-explicit-resource-management"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-async-explicit-resource-management script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-async-explicit-resource-management"]
});
```

## Reference
- [Proposal: ECMAScript Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management)
- [Proposal: ECMAScript Async Explicit Resource Management](https://github.com/tc39/proposal-async-explicit-resource-management)
