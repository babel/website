---
layout: docs
title: validation.react
description: How to use the validation.react transformer.
permalink: /docs/advanced/transformers/validation/react/
redirect_from:
 - /docs/usage/transformers/validation/react/
---

The `validation.react` transformer validates your `react` imports for a non-capitalised module source.

This is necessary as some module bundlers may resolve `require("react");` and `require("React");` to
different scripts which will cause two versions of react to load that may introduce conflicts.

## Example

**In**

```javascript
var React = require("React");
```

**Out**

```
SyntaxError: stdin: Line 1: Did you mean "react"?
> 1 | var React = require("React");
    |                     ^
  2 |
```

## Blacklisting

For one reason or another you may want to use the module name `React`. You can do this
by blacklisting the `validation.react` transformer:

```javascript
require("babel").transform("code", { blacklist: ["validation.react"] });
```

```sh
$ babel --blacklist validation.react script.js
```
