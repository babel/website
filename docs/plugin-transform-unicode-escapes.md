---
id: babel-plugin-transform-unicode-escapes
title: "@babel/plugin-transform-unicode-escapes"
sidebar_label: unicode-escapes
---

> **NOTE**: This plugin is included in `@babel/preset-env`

Compile ES2015 Unicode escapes to ES5

## Example

**In**

```js title="JavaScript"
var \u{1d49c} = "\u{Babe1}";

console.log(\u{1d49c});
```

**Out**

```js title="JavaScript"
var _ud835_udc9c = "\uDAAA\uDFE1";

console.log(_ud835_udc9c);
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-unicode-escapes
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-unicode-escapes"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-unicode-escapes
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-unicode-escapes"],
});
```
