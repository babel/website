---
layout: docs
title: minification.inlineExpressions
description: How to use the minification.inlineExpressions transformer.
permalink: /docs/advanced/transformers/utility/inline-expressions/
redirect_from:
 - /docs/usage/transformers/utility/inline-expressions/
---

Inline expressions that we can statically evaluate. ie.

## Usage

```javascript
require("babel").transform("code", { optional: ["minification.inlineExpressions"] });
```

```sh
$ babel --optional minification.inlineExpressions script.js
```

## Example

**In**

```javascript
var foo = 5 * 5;
```

**Out**

```javascript
var foo = 25;
```
