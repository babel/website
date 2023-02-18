---
id: babel-plugin-transform-function-name
title: "@babel/plugin-transform-function-name"
sidebar_label: function-name
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Examples

**In**

```js title="JavaScript"
let number = x => x;
```

**Out**

```js title="JavaScript"
var number = function number(x) {
  return x;
};
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-function-name
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-function-name"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-function-name script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-function-name"],
});
```
