---
id: babel-plugin-syntax-module-string-names
title: @babel/plugin-syntax-module-string-names
sidebar_label: syntax-module-string-names
---

## Example

This plugin enables `@babel/parser` to parse

```js
export { smile as "😄" } from "./emojis.js";
```

It requires `@babel/parser@^7.12.0`. When used with `@babel/plugin-transform-modules-commonjs`, the example above will be transformed as

```js
const emojis = require("./emojis.js");
Object.defineProperty(exports, "__esModule", {
  value: true,
});

exports["😄"] = emojis.smile;
```

Note that it is not possible to transpile this syntax to ES2015-style imports and exports. They are supported in other module systems such as amd, systemjs and umd.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-module-string-names
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-module-string-names"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-module-string-names script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-module-string-names"],
});
```
