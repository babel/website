---
id: babel-plugin-transform-destructuring
title: @babel/plugin-transform-destructuring
sidebar_label: destructuring
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Examples

**In**

```javascript
let { x, y } = obj;

let [a, b, ...rest] = arr;
```

**Out**

```javascript
function _toArray(arr) { ... }

let _obj = obj,
    x = _obj.x,
    y = _obj.y;

let _arr = arr,
    _arr2 = _toArray(_arr),
    a = _arr2[0],
    b = _arr2[1],
    rest = _arr2.slice(2);
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-destructuring
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-destructuring"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-destructuring script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-destructuring"],
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

Enabling this option will assume that what you want to destructure is an array and won't use `Array.from` on other iterables.

> ⚠️ Consider migrating to the top level [`iterableIsArray`](assumptions.md#iterableisarray) assumption.

```jsonc
// babel.config.json
{
  "assumptions": {
    "iterableIsArray": true
  }
}
```

### `useBuiltIns`

`boolean`, defaults to `false`.

Enabling this option will use `Object.assign` directly instead of the Babel's `extends` helper.

##### Example

**.babelrc**

```json
{
  "plugins": [
    ["@babel/plugin-transform-destructuring", { "useBuiltIns": true }]
  ]
}
```

**In**

```js
var { ...x } = z;
```

**Out**

```js
var _z = z,
  x = Object.assign({}, _z);
```

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)

### `allowArrayLike`

`boolean`, defaults to `false`

Added in: `v7.10.0`

This option allows destructuring array-like objects using the array destructuring syntax.

An array-like object is an object with a `length` property: for example, `{ 0: "a", 1: "b", length: 2 }`. Note that, like real arrays, array-like objects can have "holes": `{ 1: "a", length: 3 }` is equivalent to `[ (hole), "a", (hole) ]`.

While it is _not_ spec-compliant to destructure array-like objects as if they were arrays, there are many objects that would be _iterables_ in modern browsers with `Symbol.iterator` support. Some notable examples are the DOM collections, like `document.querySelectorAll("img.big")`, which are the main use case for this option.

Please note that Babel allows destructuring `arguments` in old engines even if this option is disabled, because it's defined as _iterable_ in the ECMAScript specification.

> ⚠️ Consider migrating to the top level [`arrayLikeIsIterable`](assumptions.md#arraylikeisiterable) assumption.

```jsonc
// babel.config.json
{
  "assumptions": {
    "arrayLikeIsIterable": true
  }
}
```

## References

- [MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
