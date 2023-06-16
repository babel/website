---
id: babel-plugin-transform-property-literals
title: "@babel/plugin-transform-property-literals"
sidebar_label: property-literals
---

:::info
This plugin is included in `@babel/preset-env`
:::

## Example

**In**

```js title="JavaScript"
var foo = {
  // changed
  const: function() {},
  var: function() {},

  // not changed
  "default": 1,
  [a]: 2,
  foo: 1,
};
```

**Out**

```js title="JavaScript"
var foo = {
  "const": function() {},
  "var": function() {},

  "default": 1,
  [a]: 2,
  foo: 1,
};
```

## Installation

```shell npm2yarn
npm install @babel/plugin-transform-property-literals --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-property-literals"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-property-literals script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-property-literals"],
});
```
