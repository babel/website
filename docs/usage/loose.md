---
layout: docs
title: Loose mode
description: Making your code faster (but less spec-compliant)
permalink: /docs/usage/loose/
---

Loose mode enables certain transformers to generate cleaner output that lacks
specific ES6 edgecases. These edgecases are either unlikely to appear in your
code or the inclusion of them introduces signifcant overhead.

As a result of loose mode code will execute faster and be much readable and
comparable to the original but will deviate from the spec in slight ways.

<blockquote class="to5-callout to5-callout-warning">
  <h4>WARNING</h4>
  <p>
    Please be aware of <strong>all</strong> possible caveats when enabling loose mode.
  </p>
</blockquote>

## Usage

```javascript
require("6to5").transform("code", { loose: ["classes", "computedPropertyNames"] });
```

```sh
6to5 --loose classes,computedPropertyNames script.js
```

### All

You can optionally choose to enable fast mode across all transformers instead of
manually specifying each one:

```javascript
require("6to5").transform("code", { loose: "all" });
```

```sh
6to5 --loose all script.js
```

## Caveats

### classes

#### Method enumerability

Please note that in loose mode class methods **are** enumerable. This is not in line
with the spec and you may run into issues.

#### Super behaviour

When using loose mode, `super` access is inlined using your defined super name. This
means that super calls will be as fast as possible but results in prototype
reassignment not being reflected in instances. For example:

```javascript
class Foo {
  bar() {
    return "foo";
  }
}

class Bar extends Foo {
  foo() {
    return "foo" + super.bar();
  }
}

var bar = new Bar;
bar.__proto__ = {
  bar: function () {
    return "bar";
  }
};
bar.foo(); // "foofoo", should be "foobar"
```

Not only this but due to super references being inlined it removes the ability to
use `super` on getters.

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

### computedPropertyNames

Just like method assignment in classes, in loose mode, computed property names
use simple assignments instead of being defined. This is unlikely to be an issue
in production code.

### forOf

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

### modules

As per the spec, `import` and `export` are only allowed to be used at the top
level. When in loose mode these are allowed to be used anywhere.

### templateLiterals

In loose mode, tagged template literal objects aren't frozen.
