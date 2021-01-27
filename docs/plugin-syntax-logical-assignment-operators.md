---
id: babel-plugin-syntax-logical-assignment-operators
title: @babel/plugin-syntax-logical-assignment-operators
sidebar_label: syntax-logical-assignment-operators
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-logical-assignment-operators](plugin-proposal-logical-assignment-operators.md) to _both_ parse and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-logical-assignment-operators
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-logical-assignment-operators"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-logical-assignment-operators script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-logical-assignment-operators"]
});
```

