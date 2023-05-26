---
id: babel-plugin-transform-modules-amd
title: "@babel/plugin-transform-modules-amd"
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

```js title="JavaScript"
export default 42;
```

**Out**

```js title="JavaScript"
define(["exports"], function(exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true,
  });

  exports.default = 42;
});
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-modules-amd
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-modules-amd"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-modules-amd script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-modules-amd"],
});
```

## Options

### `moduleIds`

`boolean` defaults to `!!moduleId`

Added in: `v7.9.0`

Enables module ID generation.

### `moduleId`

`string`

Added in: `v7.9.0`

A hard-coded ID to use for the module. Cannot be used alongside `getModuleId`.

### `getModuleId`

`(name: string) => string`

Added in: `v7.9.0`

Given the babel-generated module name, return the name to use. Returning
a falsy value will use the original `name`.

### `moduleRoot`

`string`

Added in: `v7.9.0`

A root path to include on generated module names.

For options not listed here, see options for [`@babel/plugin-transform-modules-commonjs`](plugin-transform-modules-commonjs.md#options).
