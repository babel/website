---
id: babel-plugin-transform-unicode-regex
title: "@babel/plugin-transform-unicode-regex"
sidebar_label: unicode-regex
---

:::info
This plugin is included in `@babel/preset-env`
:::

## Example

**In**

```js title="JavaScript"
var string = "foo💩bar";
var match = string.match(/foo(.)bar/u);
```

**Out**

```js title="JavaScript"
var string = "foo💩bar";
var match = string.match(
  /foo((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))bar/
);
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-unicode-regex
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-unicode-regex"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-unicode-regex script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-unicode-regex"],
});
```
