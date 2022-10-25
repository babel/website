---
id: babel-plugin-syntax-explicit-resource-management
title: @babel/plugin-syntax-explicit-resource-management
sidebar_label: syntax-explicit-resource-management
---

> #### Syntax only
>
> This plugin only enables Babel to parse this syntax. Babel does not support transforming this syntax

This plugin enables Babel to parse using declarations:

```js
using handler = await read();
```

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-explicit-resource-management
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-explicit-resource-management"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-explicit-resource-management script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-explicit-resource-management"]
});
```
