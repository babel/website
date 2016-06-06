---
layout: docs
title: ES2015 modules to UMD transform
description:
permalink: /docs/plugins/transform-es2015-modules-umd/
package: babel-plugin-transform-es2015-modules-umd
---

This plugin transforms ES2015 modules to UMD.

[Universal Module Definition (UMD)](https://github.com/umdjs/umd)


## Example

**In**

```javascript
export default 42;
```

**Out**

```javascript
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.actual = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = 42;
});
```

## Installation

```sh
$ npm install babel-plugin-transform-es2015-modules-umd
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-es2015-modules-umd"]
}
```
