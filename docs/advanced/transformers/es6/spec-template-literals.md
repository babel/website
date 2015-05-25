---
layout: docs
title: es6.spec.templateLiterals
description: How to use the es6.spec.templateLiterals transformer.
permalink: /docs/advanced/transformers/es6/spec-template-literals/
redirect_from:
 - /docs/usage/transformers/es6/spec-template-literals/
---

This transformer wraps all template literal expressions with `String`. See [Issue #1065](https://github.com/babel/babel/issues/1065) for more info.

## Usage

```javascript
require("babel").transform("code", { optional: ["es6.spec.templateLiterals"] });
```

```sh
$ babel --optional es6.spec.templateLiterals script.js
```

## Example

**In**

```javascript
`foo${bar}`;
```

**Out**

```javascript
"foo" + String(bar);
```
