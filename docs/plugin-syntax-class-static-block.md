---
id: babel-plugin-syntax-class-static-block
title: @babel/plugin-syntax-class-static-block
sidebar_label: syntax-class-static-block
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-class-static-block](plugin-proposal-class-static-block.md) to _both_ parse and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-class-static-block
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-class-static-block"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-class-static-block script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-class-static-block"],
});
```
