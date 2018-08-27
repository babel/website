---
id: version-7.0.0-babel-plugin-transform-modules-amd
title: @babel/plugin-transform-modules-amd
sidebar_label: transform-modules-amd
original_id: babel-plugin-transform-modules-amd
---

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

### Via `.babelrc` (Recommended)

**.babelrc**

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

