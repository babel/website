---
id: babel-plugin-transform-for-of
title: "@babel/plugin-transform-for-of"
sidebar_label: for-of
---

:::info
This plugin is included in `@babel/preset-env`
:::

## Example

**In**

```js title="JavaScript"
for (var i of foo) {
}
```

**Out**

```js title="JavaScript"
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (
    var _iterator = foo[Symbol.iterator](), _step;
    !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
    _iteratorNormalCompletion = true
  ) {
    var i = _step.value;
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return != null) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-for-of
```

## Usage

### With a configuration file (Recommended)

Without options:

```js title="JavaScript"
{
  "plugins": ["@babel/plugin-transform-for-of"]
}
```

With options:

```js title="JavaScript"
{
  "plugins": [
    ["@babel/plugin-transform-for-of", {
      "loose": true, // defaults to false
      "assumeArray": true // defaults to false
    }]
  ]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-for-of script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-for-of"],
});
```

## Options

### `loose`

`boolean`, defaults to `false`

In loose mode, arrays are put in a fast path, thus heavily increasing performance.

:::caution
Consider migrating to the top level [`skipForOfIteratorClosing`](assumptions.md#skipforofiteratorclosing) assumption.
:::

```json title="babel.config.json"
{
  "assumptions": {
    "skipForOfIteratorClosing": true
  }
}
```

All other iterables will continue to work fine.

#### Example

**In**

```js title="JavaScript"
for (var i of foo) {
}
```

**Out**

```js title="JavaScript"
for (
  var _iterator = foo,
    _isArray = Array.isArray(_iterator),
    _i = 0,
    _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
  ;

) {
  var _ref;

  if (_isArray) {
    if (_i >= _iterator.length) break;
    _ref = _iterator[_i++];
  } else {
    _i = _iterator.next();
    if (_i.done) break;
    _ref = _i.value;
  }

  var i = _ref;
}
```

#### Abrupt completions

Under the `skipForOfIteratorClosing` assumption, an iterator's `return` method will not be called on abrupt completions caused by thrown errors.

Please see [google/traceur-compiler#1773](https://github.com/google/traceur-compiler/issues/1773) and
[babel/babel#838](https://github.com/babel/babel/issues/838) for more information.

### `allowArrayLike`

`boolean`, defaults to `false`

Added in: `v7.10.0`

This option allows for-of to be used with array-like objects.

An array-like object is an object with a `length` property: for example, `{ 0: "a", 1: "b", length: 2 }`. Note that, like real arrays, array-like objects can have "holes": `{ 1: "a", length: 3 }` is equivalent to `[ (hole), "a", (hole) ]`.

While it is _not_ spec-compliant to iterate array-like objects as if they were arrays, there are many objects that would be _iterables_ in modern browsers with `Symbol.iterator` support. Some notable examples are the DOM collections, like `document.querySelectorAll("img.big")`, which are the main use case for this option.

Please note that Babel allows iterating `arguments` in old engines even if this option is disabled, because it's defined as _iterable_ in the ECMAScript specification.

### `assumeArray`

`boolean`, defaults to `false`

This will apply the optimization shown below to all for-of loops by assuming that _all_ loops are arrays.

Can be useful when you just want a for-of loop to represent a basic for loop over an array.

### Optimization

If a basic array is used, Babel will compile the for-of loop down to a regular for loop.

**In**

```js title="JavaScript"
for (let a of [1, 2, 3]) {
}
```

**Out**

```js title="JavaScript"
var _arr = [1, 2, 3];
for (var _i = 0; _i < _arr.length; _i++) {
  var a = _arr[_i];
}
```

:::tip
You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
:::
