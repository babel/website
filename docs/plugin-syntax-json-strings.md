---
id: babel-plugin-syntax-json-strings
title: @babel/plugin-syntax-json-strings
sidebar_label: syntax-json-strings
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-json-strings](plugin-proposal-json-strings.md) to _both_ parse and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-json-strings
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-json-strings"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-json-strings script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-json-strings"]
});
```

