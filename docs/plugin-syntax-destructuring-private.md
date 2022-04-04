---
id: babel-plugin-syntax-destructuring-private
title: @babel/plugin-syntax-destructuring-private
sidebar_label: syntax-destructuring-private
---

> Allow parsing of destructuring private fields

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-destructuring-private](plugin-proposal-destructuring-private.md) to _both_ parse and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-destructuring-private
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-destructuring-private"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-destructuring-private script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-destructuring-private"],
});
```
