---
id: babel-plugin-transform-classes
title: @babel/plugin-transform-classes
sidebar_label: classes
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Caveats

When extending a native class (e.g., `class extends Array {}`), the super class
needs to be wrapped. This is needed to workaround two problems:

- Babel transpiles classes using `SuperClass.apply(/* ... */)`, but native
  classes aren't callable and thus throw in this case.
- Some built-in functions (like `Array`) always return a new object. Instead of
  returning it, Babel should treat it as the new `this`.

The wrapper works on IE11 and every other browser with `Object.setPrototypeOf` or `__proto__` as fallback.
There is **NO IE <= 10 support**. If you need IE <= 10 it's recommended that you don't extend natives.

Babel needs to statically know if you are extending a built-in class. For this reason, the "mixin pattern" doesn't work:

```js
class Foo extends mixin(Array) {}

function mixin(Super) {
  return class extends Super {
    mix() {}
  };
}
```

To workaround this limitation, you can add another class in the inheritance chain so that Babel can wrap the native class:

```js
const ExtensibleArray = class extends Array {};

class Foo extends mixin(ExtensibleArray) {}
```

## Examples

**In**

```javascript
class Test {
  constructor(name) {
    this.name = name;
  }

  logger() {
    console.log("Hello", this.name);
  }
}
```

**Out**

```javascript
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Test = (function() {
  function Test(name) {
    _classCallCheck(this, Test);

    this.name = name;
  }

  Test.prototype.logger = function logger() {
    console.log("Hello", this.name);
  };

  return Test;
})();
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-classes
```

## Usage

### With a configuration file (Recommended)

```js
// without options
{
  "plugins": ["@babel/plugin-transform-classes"]
}

// with options
{
  "plugins": [
    ["@babel/plugin-transform-classes", {
      "loose": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-classes script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-classes"],
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

> ⚠️ Consider migrating to the top level [`assumptions`](assumptions.md) which offers granular control over various `loose` mode deductions Babel has applied.

```jsonc
// babel.config.json
{
  "assumptions": {
    "constantSuper": true,
    "noClassCalls": true,
    "setClassMethods": true,
    "superIsCallableConstructor": true
  }
}
```

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

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
