---
layout: docs
title: jscript
description: How to use the jscript transformer.
permalink: /docs/advanced/transformers/other/jscript/
redirect_from:
 - /docs/usage/transformers/other/jscript/
---

This transformer transforms named function expressions into function declarations to get around some
[particularly nasty JScript bugs](https://kangax.github.io/nfe/#jscript-bugs) related to name
function expressions.

## Usage

```javascript
require("babel").transform("code", { optional: ["jscript"] });
```

```sh
$ babel --optional jscript script.js
```

## Example

**In**

```javascript
var foo = function bar() {

};
```

**Out**

```javascript
"use strict";

var foo = (function () {
  function bar() {}

  return bar;
})();
```
