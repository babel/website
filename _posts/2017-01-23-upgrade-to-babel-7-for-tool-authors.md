---
layout: post
title:  "Upgrade to Babel 7 for Tool Authors (WIP)"
author: Sven SAULEAU
date:   2017-01-23 12:00:00
categories: announcements
share_text: "Upgrade to Babel 7 for Tool Authors"
third_party_js:
- https://platform.twitter.com/widgets.js
custom_js_with_timestamps:
- docs.js
---

This document is for developers that create tools that depend on Babel such as babel plugins and the relevant changes for upgrading to Babel 7.

> Also check out the [User Upgrade Guide](/blog/2017/01/23/upgrade-guide-for-babel-7) for other relevant changes.

## All Babel packages

> Support for Node.js 0.10 and 0.12 has been dropped

> Likelihood to break your CI: high
 
> Dropped use of `add-module-exports` plugin on Babel packages

> Likelihood to break your CI: high

This had to be used earlier to prevent a breaking change with our exports.

If you import a Babel package in a library you may need to use `.default` when using require.

## Babel Presets

> Dropped support for exporting as an object [#5128](https://github.com/babel/babel/pull/5128)

> Likelihood to break your CI: high

A preset needs to export a function as the default export or with `module.exports`.

Before: Babel 6

```js
module.exports = {
  buildPreset: function () {
    return {
      plugins: ['plugin-a']
    };
  }
};
```

```js
export default {
  plugins: ['plugin-a']
}
```

After: Babel 7

```js
module.exports = function () {
  return {
    plugins: ['plugin-a']
  };
};
```

```js
export default function() {
  return {
    plugins: ['plugin-a']
  };
}
```

## Babylon

> AST changes

> Likelihood to break your CI: low

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

See our [upgrade PR for Babel](https://github.com/babel/babel/pull/5317) and the [Babylon AST spec](https://github.com/babel/babylon/blob/7.0/ast/spec.md) for more information.

> Removed the `*` plugin option [babel/babylon#301](https://github.com/babel/babylon/pull/301)

> Likelihood to break your CI: low

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

See babylon's [plugin options](https://babeljs.io/docs/core-packages/babylon/#api-plugins).

> Removed `classConstructorCall` plugin [#291](https://github.com/babel/babylon/pull/291)

> Likelihood to break your CI: low
