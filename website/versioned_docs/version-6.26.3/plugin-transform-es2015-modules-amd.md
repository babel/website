---
id: version-6.26.3-babel-plugin-transform-es2015-modules-amd
title: babel-plugin-transform-es2015-modules-amd
sidebar_label: transform-es2015-modules-amd
original_id: babel-plugin-transform-es2015-modules-amd
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
npm install --save-dev babel-plugin-transform-es2015-modules-amd
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-modules-amd"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-modules-amd script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-modules-amd"]
});
```

### Options

See options for `babel-plugin-transform-es2015-commonjs`.

