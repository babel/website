---
id: babel-plugin-syntax-throw-expressions
title: @babel/plugin-syntax-throw-expressions
sidebar_label: syntax-throw-expressions
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-throw-expressions](plugin-proposal-throw-expressions.md) to _both_ parse and transform this syntax.

```js
function test(param = throw new Error('required!')) {
  const test = param === true || throw new Error('Falsy!');
}
```


## Installation

```sh
npm install --save-dev @babel/plugin-syntax-throw-expressions
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-throw-expressions"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-throw-expressions script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-throw-expressions"]
});
```

