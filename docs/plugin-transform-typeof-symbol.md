---
id: babel-plugin-transform-typeof-symbol
title: "@babel/plugin-transform-typeof-symbol"
sidebar_label: typeof-symbol
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Example

**In**

```js title="JavaScript"
typeof Symbol() === "symbol";
```

**Out**

```js title="JavaScript"
var _typeof = function(obj) {
  return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
};

_typeof(Symbol()) === "symbol";
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-typeof-symbol
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-typeof-symbol"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-typeof-symbol script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-typeof-symbol"],
});
```
