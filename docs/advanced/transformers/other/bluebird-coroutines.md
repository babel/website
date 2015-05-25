---
layout: docs
title: bluebirdCoroutines
description: How to use the bluebirdCoroutines transformer.
permalink: /docs/advanced/transformers/other/bluebird-coroutines/
redirect_from:
 - /docs/usage/transformers/other/bluebird-coroutines/
---

Transforms async functions to their equivalent bluebird method.

## Usage

```javascript
require("babel").transform("code", { optional: ["bluebirdCoroutines"] });
```

```sh
$ babel --optional bluebirdCoroutines script.js
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
