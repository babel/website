---
layout: docs
title: es3.memberExpressionLiterals
description: How to use the es3.memberExpressionLiterals transformer.
permalink: /docs/advanced/transformers/es3/member-expression-literals/
redirect_from:
 - /docs/usage/transformers/es3/member-expression-literals/
---

Turn member expression reserved word properties into literals.

## Example

**In**

```javascript
foo.catch;
```

**Out**

```javascript
foo["catch"];
```
