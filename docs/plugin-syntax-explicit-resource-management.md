---
id: babel-plugin-syntax-explicit-resource-management
title: "@babel/plugin-syntax-explicit-resource-management"
sidebar_label: syntax-explicit-resource-management
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-explicit-resource-management](plugin-proposal-explicit-resource-management.md) to _both_ parse and transform this syntax.

<details>
  <summary>History</summary>

| Version | Changes |
| --- | --- |
| v7.22.0 | Supports `await using` |
</details>

This plugin enables Babel to parse using declarations:

```js title="JavaScript"
using handler = await read();
await using handler = await read();
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

## Reference
- [Proposal: ECMAScript Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management)
