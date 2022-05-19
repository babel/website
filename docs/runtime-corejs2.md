---
id: babel-runtime-corejs2
title: @babel/runtime-corejs2
sidebar_label: runtime-corejs2
---

`@babel/runtime-corejs2` is a library that contain's Babel modular runtime helpers as well as version 2 of [`core-js`](https://github.com/zloirock/core-js).

## Installation

```sh
npm install --save @babel/runtime-corejs2
```

> See also: [`@babel/runtime`](runtime.md).

## Usage

This is meant to be used as a runtime `dependency` along with the Babel plugin [`@babel/plugin-transform-runtime`](plugin-transform-runtime.md). Please check out the documentation in that package for usage.

## Why

Sometimes Babel may inject some code in the output that is the same and thus can be potentially re-used.

For example, with the class transform (without loose mode):

```js
class A {}
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

With `@babel/plugin-transform-runtime`, it would replace the reference to the function to the `@babel/runtime-corejs2` version.

```js
var _classCallCheck = require("@babel/runtime-corejs2/helpers/classCallCheck");

var Circle = function Circle() {
  _classCallCheck(this, Circle);
};
```

`@babel/runtime-corejs2` is just the package that contains the implementations of the functions in a modular way.

## Difference from `@babel/runtime`

This can be used instead of a polyfill for any non-instance methods.
It will replace things like `Promise` or `Symbol` with the library functions in `core-js`.

```js
Promise;
```

turns into:

```js
var _Promise = require("@babel/runtime-corejs2/core-js/promise.js");
```

This transformation is also applied for Babel's helpers.
