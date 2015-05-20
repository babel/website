---
layout: docs
title: strict
description: How to use the strict transformer.
permalink: /docs/advanced/transformers/other/strict/
redirect_from:
 - /docs/usage/transformers/other/strict/
---

The `strict` transformer automatically places a `"use strict";` directive at the top of your
files. This enables [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
which is required as ES2015 modules have an [implicit strict mode](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-module-semantics-static-semantics-isstrict).

## Example

**In**

```javascript
foo();
```

**Out**

```javascript
"use strict";

foo();
```

## Blacklisting

There *may* be scenarios where you don't want this directive placed at the top of your files, you
can avoid this behaviour by blacklisting the `strict` transformer.

**PLEASE NOTE:** If you do this you're willingly deviating from the spec and this may cause future
interop issues.

```sh
$ babel --blacklist strict script.js
```

```javascript
require("babel").transform("code", { blacklist: ["strict"] });
```
