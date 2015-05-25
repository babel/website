---
layout: docs
title: es5.properties.mutators
description: How to use the es5.properties.mutators transformer.
permalink: /docs/advanced/transformers/es5/properties-mutators/
redirect_from:
 - /docs/usage/transformers/es5/properties-mutators/
---

Turn [object initializer mutators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Method_definitions) into `Object.defineProperties`.

## Example

**In**

```javascript
var foo = {
  get bar() {
    return "bar";
  }
};
```

**Out**

```javascript
var foo = Object.defineProperties({}, {
  bar: {
    get: function () {
      return "bar";
    },
    enumerable: true,
    configurable: true
  }
});
```
