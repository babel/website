---
layout: docs
title: ES2015 typeof symbol transform
description:
permalink: /docs/plugins/transform-es2015-typeof-symbol/
package: babel-plugin-transform-es2015-typeof-symbol
---

ES6 introduces a new native type called [symbols](/docs/learn-es6#symbols).
This transformer wraps all `typeof` expressions with a method that
replicates native behaviour. (ie. returning "symbol" for symbols)

## Example

**In**

```javascript
typeof Symbol() === "symbol";
```

**Out**

```javascript
var _typeof = function (obj) {
  return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
};

_typeof(Symbol()) === "symbol";
```

## Installation

```sh
$ npm install babel-plugin-transform-es2015-typeof-symbol
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-es2015-typeof-symbol"]
}
```
