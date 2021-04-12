---
id: babel-plugin-syntax-async-do-expressions
title: @babel/plugin-syntax-async-do-expressions
sidebar_label: syntax-async-do-expressions
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-async-do-expressions](plugin-proposal-async-do-expressions.md) to _both_ parse and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-async-do-expressions
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-async-do-expressions"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-async-do-expressions script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-async-do-expressions"],
});
```
