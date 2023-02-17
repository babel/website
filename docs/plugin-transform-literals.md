---
id: babel-plugin-transform-literals
title: "@babel/plugin-transform-literals"
sidebar_label: literals
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Example

**In**

```js title="JavaScript"
var b = 0b11; // binary integer literal
var o = 0o7; // octal integer literal
const u = "Hello\u{000A}\u{0009}!"; // unicode string literals, newline and tab
```

**Out**

```js title="JavaScript"
var b = 3; // binary integer literal
var o = 7; // octal integer literal
const u = "Hello\n\t!"; // unicode string literals, newline and tab
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-literals
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-literals"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-literals script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-literals"],
});
```
