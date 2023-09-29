---
id: babel-plugin-transform-modules-systemjs
title: "@babel/plugin-transform-modules-systemjs"
sidebar_label: SystemJS
---

:::info
This plugin is included in `@babel/preset-env` under the `modules` option
:::

This plugin transforms ECMAScript modules to [SystemJS](https://github.com/systemjs/systemjs/blob/master/docs/system-register.md). Note that only the _syntax_ of import/export statements (`import "./mod.js"`) and import expressions (`import('./mod.js')`) is transformed, as Babel is unaware of different resolution algorithms between implementations of ECMAScript modules and SystemJS.

## Example

**In**

```js title="JavaScript"
export default 42;
```

**Out**

```js title="JavaScript"
System.register([], function(_export, _context) {
  return {
    setters: [],
    execute: function() {
      _export("default", 42);
    },
  };
});
```

For dynamic import support (`import('./lazy.js').then(m => ...)`), enable the [@babel/plugin-syntax-dynamic-import](plugin-syntax-dynamic-import.md) plugin before this one.

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-modules-systemjs
```

## Usage

### With a configuration file (Recommended)

Without options:

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-modules-systemjs"]
}
```

With options:

```json title="babel.config.json"
{
  "plugins": [
    [
      "@babel/plugin-transform-modules-systemjs",
      {
        // outputs SystemJS.register(...)
        "systemGlobal": "SystemJS"
      }
    ]
  ]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-modules-systemjs script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-modules-systemjs"],
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
