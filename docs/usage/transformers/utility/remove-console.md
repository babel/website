---
layout: docs
title: utility.removeConsole
description: How to use the utility.removeConsole transformer.
permalink: /docs/usage/transformers/utility/remove-console/
---

Remove all calls to `console.*` functions.

## Usage

```javascript
require("babel").transform("code", { optional: ["utility.removeConsole"] });
```

```sh
$ babel --optional utility.removeConsole script.js
```

## Example

**In**

```javascript
console.log("foo");
console.error("bar");
console.trace();
console.assert(foo());
```

**Out**

```javascript

```
