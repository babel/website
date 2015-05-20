---
layout: docs
title: minification.removeDebugger
description: How to use the minification.removeDebugger transformer.
permalink: /docs/advanced/transformers/minification/remove-debugger/
redirect_from:
 - /docs/usage/transformers/minification/remove-debugger/
---

Remove all `debugger;` statements.

## Usage

```javascript
require("babel").transform("code", { optional: ["minification.removeDebugger"] });
```

```sh
$ babel --optional minification.removeDebugger script.js
```

## Example

**In**

```javascript
debugger;
```

**Out**

```javascript

```
