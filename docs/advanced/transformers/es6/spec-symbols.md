---
layout: docs
title: es6.spec.symbols
description: How to use the es6.spec.symbols transformer.
permalink: /docs/advanced/transformers/es6/spec-symbols/
redirect_from:
 - /docs/usage/transformers/es6/spec-symbols/
---

ES6 introduces a new native type called [symbols](/docs/learn-es6#symbols).
This transformer wraps all `typeof` expressions with a method that
replicates native behaviour. (ie. returning "symbol" for symbols)

## Usage

```javascript
require("babel").transform("code", { optional: ["es6.spec.symbols"] });
```

```sh
$ babel --optional es6.spec.symbols script.js
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
