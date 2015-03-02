---
layout: docs
title: utility.inlineExpressions
description: How to use the utility.inlineExpressions transformer.
permalink: /docs/usage/transformers/utility/inline-expressions/
---

Inline expressions that we can statically evaluate. ie.

## Usage

```javascript
require("babel").transform("code", { optional: ["utility.inlineExpressions"] });
```

```sh
$ babel --optional utility.inlineExpressions script.js
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
