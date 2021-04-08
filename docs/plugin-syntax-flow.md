---
id: babel-plugin-syntax-flow
title: @babel/plugin-syntax-flow
sidebar_label: syntax-flow
---

> #### Syntax only
>
> Using this plugin directly only enables Babel to parse this syntax. If you want to remove Flow syntax then use the [flow-strip-types](plugin-transform-flow-strip-types.md) plugin or [flow](preset-flow.md) preset to _both_ parse and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-flow
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-flow"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-flow script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-flow"],
});
```
