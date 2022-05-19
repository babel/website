---
id: babel-plugin-transform-modules-amd
title: @babel/plugin-transform-modules-amd
sidebar_label: AMD
---

<details>
  <summary>History</summary>
| Version | Changes |
| --- | --- |
| `v7.14.0` | Implemented the `importInterop` option |
</details>

> **NOTE**: This plugin is included in `@babel/preset-env` under the `modules` option

This plugin transforms ECMAScript modules to [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md). Note that only the _syntax_ of import/export statements (`import "./mod.js"`) and import expressions (`import('./mod.js')`) is transformed, as Babel is unaware of the different resolution algorithms between implementations of ECMAScript modules and AMD.

## Example

**In**

```javascript
export default 42;
```

**Out**

```javascript
define(["exports"], function(exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true,
  });

  exports.default = 42;
});
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-modules-amd
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-modules-amd"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-modules-amd script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-modules-amd"],
});
```

### Options

See options for [`@babel/plugin-transform-modules-commonjs`](https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs#options).
