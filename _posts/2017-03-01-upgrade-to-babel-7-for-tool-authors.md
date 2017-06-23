---
layout: post
title:  "Upgrade to Babel 7 for Tool Authors (WIP)"
author: Sven SAULEAU, Henry Zhu
date:   2017-02-29 11:00:00
categories: announcements
share_text: "Upgrade to Babel 7 for Tool Authors"
third_party_js:
- https://platform.twitter.com/widgets.js
custom_js_with_timestamps:
- docs.js
---

Refer users to this document for those that create tools that depend on Babel (such as Babel plugins).

> Also check out the [User Upgrade Guide]({% post_url 2017-03-01-upgrade-to-babel-7 %}) for other relevant changes.

## All Babel packages

> Support for Node.js 0.10 and 0.12 has been dropped ![high](https://img.shields.io/badge/level%20of%20awesomeness%3F-high-red.svg)

> Dropped use of `add-module-exports` plugin on Babel packages ![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

This had to be used earlier to prevent a breaking change with our exports.

If you import a Babel package in a library you may need to use `.default` when using `require` rather than `import`.

## `babel-core`

The publicly exposed but undocumented `Pipeline` class has been removed. Best to use the transformation methods exposed from `babel-core` directly [babel/babel#5376](https://github.com/babel/babel/pull/5376).

The `babel.util.*` helper methods have been removed, and `util.EXTENSIONS` has been moved to `babel.DEFAULT_EXTENSIONS` [babel/babel#5487](https://github.com/babel/babel/pull/5487).

Calls to `babel.transform` or any other transform function may return `null` if the file matched an `ignore` pattern or failed to match an `only` pattern [babel/babel#5487](https://github.com/babel/babel/pull/5487).

The `opts.basename` option exposed on `state.file.opts` has been removed. If you need it, best to build it from `opts.filename` yourself [babel/babel#5467](https://github.com/babel/babel/pull/5467).

## Babylon

> AST changes ![high](https://img.shields.io/badge/risk%20of%20breakage%3F-high-red.svg)

Flow: Node renamed from `ExistentialTypeParam` to `ExistsTypeAnnotation` [#322](https://github.com/babel/babylon/pull/322)

```js
type Maybe<T> = _Maybe<T, *>;
```

Flow: Node renamed from `NumericLiteralTypeAnnotation` to `NumberLiteralTypeAnnotation` [babel/babylon#332](https://github.com/babel/babylon/pull/332)

```js
type T = 0;
```

Flow: New node `Variance` which replaces the string value of the `variance` field on several nodes (TODO: be more specific here) [babel/babylon#333](https://github.com/babel/babylon/pull/333)

```js
class A {+p:T}
class A {-p:T}
```

Flow: `ObjectTypeIndexer` location info matches Flow's better [babel/babylon#228](https://github.com/babel/babylon/pull/228)

Babylon was including the semicolon in the location, whereas Flow didn't.

```js
var a: { [a: number]: string; [b: number]: string; };
```

Node `ForAwaitStatement` has been removed [#349](https://github.com/babel/babylon/pull/349)

An `await` property is defined instead.

```text
interface ForOfStatement <: ForInStatement {
  type: "ForOfStatement";
  await: boolean;
}
```

```js
async function f() {
  for await (let x of y);
}
```

Nodes `RestProperty` and `SpreadProperty` are removed in favor of reusing `RestElement` and `SpreadElement` [#384](https://github.com/babel/babylon/pull/384)

The actual syntax for both is the same: `...`. Before we differentiated the usage of them based on if it was used in an object or in an array.

See our [upgrade PR for Babel](https://github.com/babel/babel/pull/5317) and the [Babylon AST spec](https://github.com/babel/babylon/blob/7.0/ast/spec.md) for more information.

> Removed the `*` plugin option [babel/babylon#301](https://github.com/babel/babylon/pull/301) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

This was first added in v6.14.1 (Nov 17, 2016) so it's unlikely anyone was using this.

This catch-all option was removed; instead you should specifically decide which plugins you want to activate.

We thought it would be a good idea for tools so they wouldn't have to constantly update their config but it also means we can't easily make a breaking change.

Before:

```js
babylon.parse(code, {
  plugins: [ "*" ]
})
```

You can get the old behavior using:

```js
babylon.parse(code, {
  plugins: [
    "asyncGenerators",
    "classProperties",
    "decorators",
    "doExpressions",
    "dynamicImport",
    "exportExtensions",
    "flow",
    "functionBind",
    "functionSent",
    "jsx",
    "objectRestSpread",
  ]
})
```

See Babylon's [plugin options](https://babeljs.io/docs/core-packages/babylon/#api-plugins).

> Removed `classConstructorCall` plugin [#291](https://github.com/babel/babylon/pull/291) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)
