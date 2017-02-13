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

This document is for developers that create tools that depend on Babel.

> Please refer to the [User Upgrade Guide](/blog/2017/01/23/upgrade-guide-for-babel-7) for other upgrade changes.

## All Babel packages

> Support for Node.js 0.10 and 0.12 has been dropped

> Dropped use of `add-module-exports` plugin

This had to be used to prevent a breaking change with our exports. Now if you import a babel package in a library you may need to use `.default` for commonjs.

## Babylon

> AST changes

These changes only affect other tools such as Babel plugins.

* Flow: Node renamed from `ExistentialTypeParam` to `ExistsTypeAnnotation` [#322](https://github.com/babel/babylon/pull/322)
* Flow: Node renamed from `NumericLiteralTypeAnnotation` to `NumberLiteralTypeAnnotation` [babel/babylon#332](https://github.com/babel/babylon/pull/332)
* Flow: New node `Variance` which replaces the string value of the `variance` field on several nodes (TODO: be more specific here) [babel/babylon#333](https://github.com/babel/babylon/pull/333)

> Node `ForAwaitStatement` has been removed [#349](https://github.com/babel/babylon/pull/349)

An `await` property is defined instead.

```text
interface ForOfStatement <: ForInStatement {
  type: "ForOfStatement";
  await: boolean;
}
```

See [Babylon AST spec](https://github.com/babel/babylon/blob/7.0/ast/spec.md) for more information.
