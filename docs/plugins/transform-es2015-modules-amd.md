---
layout: docs
title: ES2015 modules to AMD transform
description:
permalink: /docs/plugins/transform-es2015-modules-amd/
package: babel-plugin-transform-es2015-modules-amd
---

This plugin transforms ES2015 modules to AMD.

[Asynchronous Module Definition (AMD)](https://github.com/amdjs/amdjs-api)

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
$ npm install babel-plugin-transform-es2015-modules-amd
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-es2015-modules-amd"]
}
```
