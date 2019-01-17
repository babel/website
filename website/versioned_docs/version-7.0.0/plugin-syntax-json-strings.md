---
id: version-7.0.0-babel-plugin-syntax-json-strings
title: @babel/plugin-syntax-json-strings
sidebar_label: syntax-json-strings
original_id: babel-plugin-syntax-json-strings
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-json-strings](plugin-proposal-json-strings.md) to _both_ parse and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-json-strings
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

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
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-json-strings"]
});
```

