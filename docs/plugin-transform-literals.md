---
id: babel-plugin-transform-literals
title: @babel/plugin-transform-literals
sidebar_label: literals
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Example

**In**

```js
var b = 0b11; // binary integer literal
var o = 0o7; // octal integer literal
const u = "Hello\u{000A}\u{0009}!"; // unicode string literals, newline and tab
```

**Out**

```js
var b = 3; // binary integer literal
var o = 7; // octal integer literal
const u = "Hello\n\t!"; // unicode string literals, newline and tab
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-literals
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-literals"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-literals script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-literals"],
});
```
