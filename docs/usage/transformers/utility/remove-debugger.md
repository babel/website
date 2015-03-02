---
layout: docs
title: utility.removeDebugger
description: How to use the utility.removeDebugger transformer.
permalink: /docs/usage/transformers/utility/remove-debugger
---

Remove all `debugger;` statements.

## Usage

```javascript
require("babel").transform("code", { optional: ["utility.removeDebugger"] });
```

```sh
$ babel --optional utility.removeDebugger script.js
```

## Example

**In**

```javascript
debugger;
```

**Out**

```javascript

```
