---
layout: docs
title: es7.comprehensions
description: ES7 Comprehensions
permalink: /docs/advanced/transformers/other/comprehensions/
---

## Usage

This is a [stage 0 experimental](/docs/usage/experimental) transformer. Note
that the second version enables all stage 0 transformers.

```javascript
require("babel").transform("code", { optional: ["es7.comprehensions"] });
require("babel").transform("code", { stage: 0 });
```

```sh
$ babel --optional es7.comprehensions script.js
$ babel --stage 0 script.js
```

## Explanation

Array and generator comprehensions provide simple declarative list processing
similar as used in many functional programming patterns.

```js
// Array comprehensions
var results = [
  for (c of customers)
    if (c.city == "Seattle")
      { name: c.name, age: c.age }
]

// Generator comprehensions
var results = (
  for (c of customers)
    if (c.city == "Seattle")
      { name: c.name, age: c.age }
)
```
