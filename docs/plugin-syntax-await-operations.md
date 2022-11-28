---
id: babel-plugin-syntax-await-operations
title: @babel/plugin-syntax-await-operations
sidebar_label: syntax-await-operations
---

> Allow parsing of await operations

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-await-operations](plugin-proposal-await-operations.md) to _both_ parse and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-await-operations
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-await-operations"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-await-operations script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-await-operations"],
});
```
