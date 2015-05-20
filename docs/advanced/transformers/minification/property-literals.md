---
layout: docs
title: minification.propertyLiterals
description: How to use the minification.propertyLiterals transformer.
permalink: /docs/advanced/transformers/minification/property-literals/
redirect_from:
 - /docs/usage/transformers/minification/property-literals/
---

Turn valid identifier property key literals into identifiers.

## Example

**In**

```javascript
var foo = {
  "bar": function () {}
};
```

**Out**

```javascript
var foo = {
  bar: function () {}
};
```
