---
layout: docs
title: bluebirdCoroutines
description: How to use the bluebirdCoroutines transformer.
permalink: /docs/usage/transformers/other/bluebird-coroutines/
---

Transforms async functions to their equivalent bluebird method.

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
var Bluebird = require("bluebird");

var foo = Bluebird.coroutine(function* () {
  yield bar();
});
```
