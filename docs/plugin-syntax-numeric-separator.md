---
id: babel-plugin-syntax-numeric-separator
title: @babel/plugin-syntax-numeric-separator
sidebar_label: syntax-numeric-separator
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-numeric-separator](plugin-proposal-numeric-separator.md) to _both_ parse and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-numeric-separator
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-numeric-separator"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-numeric-separator script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-numeric-separator"]
});
```

