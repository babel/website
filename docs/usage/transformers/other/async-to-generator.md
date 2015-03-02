---
layout: docs
title: asyncToGenerator
description: How to use the asyncToGenerator transformer.
permalink: /docs/usage/transformers/other/async-to-generator
---

Transforms async functions to a generator that uses a helper. This is useful if
you don't want to use `regenerator` or `bluebird`.

## Usage

```javascript
require("babel").transform("code", { optional: ["asyncToGenerator"] });
```

```sh
$ babel --optional asyncToGenerator script.js
```

## Example

**In**

```javascript
async function foo() {
  await bar();
}
```

**Out**

```javascript
var _asyncToGenerator = function (fn) {
  ...
};

var foo = _asyncToGenerator(function* () {
  yield bar();
});
```
