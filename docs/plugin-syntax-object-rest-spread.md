---
id: babel-plugin-syntax-object-rest-spread
title: @babel/plugin-syntax-object-rest-spread
sidebar_label: syntax-object-rest-spread
---

> #### Syntax only
>
> It's unlikely you want to directly use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-object-rest-spread](babeljs.io/docs/en/plugin-proposal-object-rest-spread.md) to both _parse_ and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-object-rest-spread
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-object-rest-spread"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-object-rest-spread script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-object-rest-spread"]
});
```

