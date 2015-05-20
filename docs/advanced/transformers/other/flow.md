---
layout: docs
title: flow
description: How to use the flow transformer.
permalink: /docs/advanced/transformers/other/flow/
redirect_from:
 - /docs/usage/transformers/other/flow/
---

The `flow` transformer is responsible for stripping flow nodes and type annotations from
your code.

## Example

**In**

```javascript
function foo(one: any, two: number, three?): string {}
```

**Out**

```javascript
function foo(one, two, three) {}
```

## Blacklisting

For one reason or another you may want flow nodes and type annotations to be retained.
You can do this by blacklisting the `flow` transformer:

```javascript
require("babel").transform("code", { blacklist: ["flow"] });
```

```sh
$ babel --blacklist flow script.js
```
