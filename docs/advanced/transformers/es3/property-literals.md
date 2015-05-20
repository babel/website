---
layout: docs
title: es3.propertyLiterals
description: How to use the es3.propertyLiterals transformer.
permalink: /docs/advanced/transformers/es3/property-literals/
redirect_from:
 - /docs/usage/transformers/es3/property-literals/
---

Turn reserved word properties into literals.

## Usage

```javascript
require("babel").transform("code", { optional: ["minification.propertyLiterals"] });
```

```sh
$ babel --optional minification.propertyLiterals script.js
```

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
