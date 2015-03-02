---
layout: docs
title: spec.typeofSymbol
description: How to use the spec.typeofSymbol transformer.
permalink: /docs/usage/transformers/spec/typeof-symbol
---

ES6 introduces a new native type called [symbols](/docs/learn-es6#symbols).
This transformer wraps all `typeof` expressions with a method that
replicates native behaviour. (ie. returning "symbol" for symbols)

## Usage

```javascript
require("babel").transform("code", { optional: ["spec.typeofSymbol"] });
```

```sh
$ babel --optional spec.typeofSymbol script.js
```

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
