---
id: babel-plugin-transform-sticky-regex
title: "@babel/plugin-transform-sticky-regex"
sidebar_label: sticky-regex
---

:::info
This plugin is included in `@babel/preset-env`
:::

## Examples

**In**

```js title="JavaScript"
const a = /o+/y;
```

**Out**

```js title="JavaScript"
var a = new RegExp("o+", "y");
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-sticky-regex
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-sticky-regex"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-sticky-regex script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-sticky-regex"],
});
```
