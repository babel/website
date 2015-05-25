---
layout: docs
title: spec.protoToAssign
description: How to use the spec.protoToAssign transformer.
permalink: /docs/advanced/transformers/spec/proto-to-assign/
redirect_from:
 - /docs/usage/transformers/spec/proto-to-assign/
---

The `protoToAssign` optional transformer will transform all `__proto__`
assignments to a method that will do a shallow copy of all properties.

This means that the following **will** work:

```javascript
var foo = { a: 1 };
var bar = { b: 2 };
bar.__proto__ = foo;
bar.a; // 1
bar.b; // 2
```

however the following **will not**:

```javascript
var foo = { a: 1 };
var bar = { b: 2 };
bar.__proto__ = foo;
bar.a; // 1
foo.a = 2;
bar.a; // 1 - should be 2 but remember that nothing is bound and it's a straight copy
```

This is a case that you have to be aware of if you intend to use this
transformer.

## Usage

```javascript
require("babel").transform("code", { optional: ["spec.protoToAssign"] });
```

```sh
$ babel --optional spec.protoToAssign script.js
```

## Example

**In**

```javascript
bar.__proto__ = foo;
```

**Out**

```javascript
var _defaults = ...;

_defaults(bar, foo);
```
