---
id: babel-plugin-syntax-nullish-coalescing-operator
title: @babel/plugin-syntax-nullish-coalescing-operator
sidebar_label: syntax-nullish-coalescing-operator
---

> #### Syntax only
>
> It's unlikely you want to directly use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-nullish-coalescing-operator](babeljs.io/docs/en/plugin-proposal-nullish-coalescing-operator.md) to both _parse_ and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-nullish-coalescing-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-nullish-coalescing-operator"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-nullish-coalescing-operator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-nullish-coalescing-operator"]
});
```

