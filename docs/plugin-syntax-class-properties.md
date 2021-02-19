---
id: babel-plugin-syntax-class-properties
title: @babel/plugin-syntax-class-properties
sidebar_label: syntax-class-properties
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-class-properties](plugin-proposal-class-properties.md) to _both_ parse and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-class-properties
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-class-properties"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-class-properties script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-class-properties"]
});
```

