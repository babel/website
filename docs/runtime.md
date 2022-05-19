---
id: babel-runtime
title: @babel/runtime
---

`@babel/runtime` is a library that contains Babel modular runtime helpers.

## Installation

```sh
npm install --save @babel/runtime
```

> See also: [`@babel/runtime-corejs2`](runtime-corejs2.md).

## Usage

This is meant to be used as a runtime `dependency` along with the Babel plugin [`@babel/plugin-transform-runtime`](plugin-transform-runtime.md). Please check out the documentation in that package for usage.

## Why

Sometimes Babel may inject some code in the output that is the same across files, and thus can be potentially re-used.

For example, with the class transform (without loose mode):

```js
class Circle {}
```

turns into:

```js
function _classCallCheck(instance, Constructor) {
  //...
}

var Circle = function Circle() {
  _classCallCheck(this, Circle);
};
```

this means every file that contains a class would have the `_classCallCheck` function repeated each time.

With `@babel/plugin-transform-runtime`, it would replace the reference to the function to the `@babel/runtime` version.

```js
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var Circle = function Circle() {
  _classCallCheck(this, Circle);
};
```

`@babel/runtime` is just the package that contains the implementations of the functions in a modular way.
