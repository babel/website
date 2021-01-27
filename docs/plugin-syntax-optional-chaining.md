---
id: babel-plugin-syntax-optional-chaining
title: @babel/plugin-syntax-optional-chaining
sidebar_label: syntax-optional-chaining
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-optional-chaining](plugin-proposal-optional-chaining.md) to _both_ parse and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-optional-chaining
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-optional-chaining"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-optional-chaining script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-optional-chaining"]
});
```

