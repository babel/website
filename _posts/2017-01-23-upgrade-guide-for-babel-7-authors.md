---
layout: post
title:  "Upgrade Guide for Babel 7 (Tool Authors)"
author: Sven SAULEAU
date:   2017-01-23 12:00:00
categories: announcements
share_text: "Upgrade Guide for Babel 7 (Tool Authors)"
third_party_js:
- https://platform.twitter.com/widgets.js
custom_js_with_timestamps:
- docs.js
---

This document is to document relevant changes in Babel 7 for tool/library authors that depend on Babel/Babylon (such as babel plugin authors).

> Please refer to the [User upgrade guide](/blog/2017/01/23/upgrade-guide-for-babel-7) for other changes.

## All Babel packages

> Support for Node.js 0.10 and 0.12 has been dropped

## Babylon

> AST changes

These changes only affect other tools such as Babel plugins.

* Flow: Node renamed from `ExistentialTypeParam` to `ExistsTypeAnnotation`
* Flow: Node renamed from `NumericLiteralTypeAnnotation` to `NumberLiteralTypeAnnotation`
* Flow: New node `Variance` which replaces the string value of the `variance` field on several nodes (be more specific here)

> Node `ForAwaitStatement` has been removed

An `await` property is defined instead.

```text
interface ForOfStatement <: ForInStatement {
  type: "ForOfStatement";
  await: boolean;
}
```

See [Babylon AST spec](https://github.com/babel/babylon/blob/7.0/ast/spec.md) for more information.
