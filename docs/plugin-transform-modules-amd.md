---
id: babel-plugin-transform-modules-amd
title: @babel/plugin-transform-modules-amd
sidebar_label: transform-modules-amd
---

This plugin transforms ECMAScript modules to [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md). The _syntax_ of Import/Export Statement (`import "./mod.js"`) and Import Expression (`import('./mod.js')`) are transformed to their AMD representation. Note that Babel is unaware of different resolution algorithms between implementations of ECMAScript modules and AMD.

## Example

**In**

```javascript
export default 42;
```

**Out**

```javascript
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
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
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-modules-amd"]
});
```

### Options

See options for `@babel/plugin-transform-modules-commonjs`.

