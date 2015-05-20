---
layout: docs
title: minification.memberExpressionLiterals
description: How to use the minification.memberExpressionLiterals transformer.
permalink: /docs/advanced/transformers/minification/member-expression-literals/
redirect_from:
 - /docs/usage/transformers/minification/member-expression-literals/
---

Turn member expression valid identifier literal properties into identifiers.

## Usage

```javascript
require("babel").transform("code", { optional: ["minification.memberExpressionLiterals"] });
```

```sh
$ babel --optional minification.memberExpressionLiterals script.js
```

## Example

**In**

```javascript
foo["bar"];
```

**Out**

```javascript
foo.bar;
```
