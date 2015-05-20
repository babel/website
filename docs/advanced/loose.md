---
layout: docs
title: Loose mode
description: Making your code faster (but less spec-compliant)
permalink: /docs/advanced/loose/
redirect_from:
 - /docs/usage/loose/
---

Loose mode enables certain transformers to generate cleaner output that lacks
specific ES6 edgecases. These edgecases are either unlikely to appear in your
code or the inclusion of them introduces significant overhead.

As a result of loose mode code will execute faster and be much more readable and
comparable to the original but will deviate from the spec in slight ways.

<blockquote class="babel-callout babel-callout-warning">
  <h4>WARNING</h4>
  <p>
    Please be aware of <strong>all</strong> possible caveats when enabling loose mode.
  </p>
</blockquote>

## Usage

```javascript
require("babel").transform("code", { loose: ["es6.classes", "es6.properties.computed"] });
```

```sh
$ babel --loose es6.classes,es6.properties.computed script.js
```

### All

You can optionally choose to enable fast mode across all transformers instead of
manually specifying each one:

```javascript
require("babel").transform("code", { loose: "all" });
```

```sh
$ babel --loose all script.js
```

## Caveats

### es6.classes

#### Method enumerability

Please note that in loose mode class methods **are** enumerable. This is not in line
with the spec and you may run into issues.

#### Method assignment

Under loose mode, methods are defined on the class prototype with simple assignments
instead of being defined. This can result in the following not working:

```javascript
class Foo {
  set bar() {
    throw new Error("foo!");
  }
}

class Bar extends Foo {
  bar() {
    // will throw an error when this method is defined
  }
}
```

When `Bar.prototype.foo` is defined it triggers the setter on `Foo`. This is a
case that is very unlikely to appear in production code however it's something
to keep in mind.

### es6.spread

All iterables are assumed to be arrays.

### es6.destructuring

All iterable destructuring are assumed to be arrays.

### es6.properties.computed

Just like method assignment in classes, in loose mode, computed property names
use simple assignments instead of being defined. This is unlikely to be an issue
in production code.

### es6.modules

By default, when using exports with babel a non-enumerable `__esModule` property
is exported.

```javascript
var foo = exports.foo = 5;

Object.defineProperty(exports, "__esModule", {
  value: true
});
```

In environments that don't support this you can enable loose mode on `es6.modules`
and instead of using `Object.defineProperty` an assignment will be used instead.

```javascript
var foo = exports.foo = 5;
exports.__esModule = true;
```

### es6.forOf

#### Abrupt completions

In loose mode an iterators `return` method will not be called on abrupt completions caused by thrown errors.

Please see [google/traceur-compiler#1773](https://github.com/google/traceur-compiler/issues/1773) and
[babel/babel/#838](https://github.com/babel/babel/issues/838) for more information.

#### Arrays

Under loose mode the `forOf` transformer will output more verbose iteration code.

For example the following:

```javascript
for (var i of foo) {}
```

is normally output as:

```javascript
for (var _iterator = foo[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
  var i = _step.value;
}
```

Under loose mode however it's output as:

```javascript
for (var _iterator = foo, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  var i;
  if (_isArray) {
    if (_i >= _iterator.length) break;
    i = _iterator[_i++];
  } else {
    _i = _iterator.next();
    if (_i.done) break;
    i = _i.value;
  }
}
```

The result is that arrays are put in a fast path, heavily increasing performance.
All other iterables will continue to work fine but array iteration will be
significantly faster.

### es6.templateLiterals

In loose mode, tagged template literal objects aren't frozen.
