---
layout: docs
title: minification.removeConsole
description: How to use the minification.removeConsole transformer.
permalink: /docs/advanced/transformers/minification/remove-console/
redirect_from:
 - /docs/usage/transformers/minification/remove-console/
---

Remove all calls to `console.*` functions.

## Usage

```javascript
require("babel").transform("code", { optional: ["minification.removeConsole"] });
```

```sh
$ babel --optional minification.removeConsole script.js
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
