---
id: babel-plugin-transform-duplicate-keys
title: "@babel/plugin-transform-duplicate-keys"
sidebar_label: duplicate-keys
---

> **NOTE**: This plugin is included in `@babel/preset-env`

This plugin actually converts duplicate keys in objects to be computed properties, which then must be handled by the [@babel/plugin-transform-computed-properties](plugin-transform-computed-properties.md) plugin. The final result won't contain any object literals with duplicate keys.

## Example

**In**

```js title="JavaScript"
var x = { a: 5, a: 6 };
var y = {
  get a() {},
  set a(x) {},
  a: 3,
};
```

**Out**

```js title="JavaScript"
var x = { a: 5, ["a"]: 6 };
var y = {
  get a() {},
  set a(x) {},
  ["a"]: 3,
};
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-duplicate-keys
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-duplicate-keys"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-duplicate-keys script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-duplicate-keys"],
});
```
