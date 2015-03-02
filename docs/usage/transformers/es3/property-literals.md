---
layout: docs
title: es3.propertyLiterals
description: How to use the es3.propertyLiterals transformer.
permalink: /docs/usage/transformers/es3/property-literals
---

Turn reserved word properties into literals.

## Example

**In**

```javascript
var foo = {
  catch: function () {}
};
```

**Out**

```javascript
var foo = {
  "catch": function () {}
};
```
