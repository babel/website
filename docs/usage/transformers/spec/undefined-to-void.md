---
layout: docs
title: spec.undefinedToVoid
description: How to use the spec.undefinedToVoid transformer.
permalink: /docs/usage/transformers/spec/undefinedToVoid/
---

Some JavaScript implementations allow `undefined` to be overwritten, this
may lead to peculiar bugs that are extremely hard to track down.

This transformer transforms `undefined` into `void 0` which returns `undefined`
regardless of if it's been reassigned.

## Usage

```javascript
require("babel").transform("code", { optional: ["spec.undefinedToVoid"] });
```

```sh
$ babel --optional spec.undefinedToVoid script.js
```

## Example

**In**

```javascript
foo === undefined;
```

**Out**

```javascript
foo === void 0;
```
