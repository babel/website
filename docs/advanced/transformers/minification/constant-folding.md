---
layout: docs
title: minification.constantFolding
description: How to use the minification.constantFolding transformer.
permalink: /docs/advanced/transformers/minification/constant-folding/
redirect_from:
 - /docs/usage/transformers/utility/inline-expressions/
 - /docs/advanced/transformers/inline-expressions/
---

Inline expressions that we can statically evaluate. ie.

## Usage

```javascript
require("babel").transform("code", { optional: ["minification.constantFolding"] });
```

```sh
$ babel --optional minification.constantFolding script.js
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
