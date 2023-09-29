---
id: babel-plugin-proposal-import-defer
title: "@babel/plugin-proposal-import-defer"
sidebar_label: import-defer
---

Transforms `import defer` declarations to deferred `require()` calls.

:::caution
This plugin can only be used when also compiling modules to CommonJS.
:::

## Example
```js title="input.js"
import defer * as lib from "lib";

later(() => {
  console.log(lib.value);
});
```

will be transformed to

```js title="output.js"
"use strict";

function lib(data) {
  lib = () => data;
  return data = _interopRequireWildcard(require("lib"));
}

later(() => {
  console.log(lib().value);
});
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-import-defer
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": [
    "@babel/plugin-proposal-import-defer",
    "@babel/plugin-transform-modules-commonjs"
  ]
}
```

### Via CLI

```sh title="Shell"
babel --plugins=@babel/plugin-proposal-import-defer,@babel/plugin-transform-modules-commonjs script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: [
    "@babel/plugin-proposal-import-defer",
    "@babel/plugin-transform-modules-commonjs"
  ],
});
```

## References

- [Proposal: Deferred Import Evaluation](https://github.com/tc39/proposal-defer-import-eval/)
