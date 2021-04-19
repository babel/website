---
id: babel-plugin-transform-spread
title: @babel/plugin-transform-spread
sidebar_label: spread
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Example

**In**

```js
var a = ["a", "b", "c"];

var b = [...a, "foo"];

var c = foo(...a);
```

**Out**

```js
var a = ["a", "b", "c"];

var b = a.concat(["foo"]);

var c = foo.apply(void 0, a);
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-spread
```

## Usage

### With a configuration file (Recommended)

Without options:

```json
{
  "plugins": ["@babel/plugin-transform-spread"]
}
```

With options:

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-spread",
      {
        "loose": true
      }
    ]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-spread script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-spread"],
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

In loose mode, **all** iterables are assumed to be arrays.

> ⚠️ Consider migrating to the top level [`iterableIsArray`](assumptions.md#iterableisarray) assumption.

```jsonc
// babel.config.json
{
  "assumptions": {
    "iterableIsArray": true
  }
}
```

Under the `iterableIsArray` assumption, Babel preserves "holes" when spreading an array (for example, `[ ...Array(2) ]` produces `[ (hole), (hole) ]`). Set `iterableIsArray` to `false` to avoid this behaviour.

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)

### `allowArrayLike`

`boolean`, defaults to `false`

Added in: `v7.10.0`

This option allows spreading array-like objects as if they were arrays.

> ⚠️ Consider migrating to the top level [`arrayLikeIsIterable`](assumptions.md#arraylikeisiterable) assumption.

```jsonc
// babel.config.json
{
  "assumptions": {
    "arrayLikeIsIterable": true
  }
}
```

An array-like object is an object with a `length` property: for example, `{ 0: "a", 1: "b", length: 2 }`. Note that, like real arrays, array-like objects can have "holes": `{ 1: "a", length: 3 }` is equivalent to `[ (hole), "a", (hole) ]`.

While it is _not_ spec-compliant to spread array-like objects as if they were arrays, there are many objects that would be _iterables_ in modern browsers with `Symbol.iterator` support. Some notable examples are the DOM collections, like `document.querySelectorAll("img.big")`, which are the main use case for this option.

Please note that Babel allows spreading `arguments` in old engines even if this option is disabled, because it's defined as _iterable_ in the ECMAScript specification.

## References

- [MDN: Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
