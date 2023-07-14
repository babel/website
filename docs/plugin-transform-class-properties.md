---
id: babel-plugin-transform-class-properties
title: "@babel/plugin-transform-class-properties"
sidebar_label: class-properties
---

:::info
This plugin is included in `@babel/preset-env`, in [ES2022](https://github.com/tc39/proposals/blob/master/finished-proposals.md)
:::

## Example

Below is a class with four class properties which will be transformed.

```js title="JavaScript"
class Bork {
  //Property initializer syntax
  instanceProperty = "bork";
  boundFunction = () => {
    return this.instanceProperty;
  };

  //Static class properties
  static staticProperty = "babelIsCool";
  static staticFunction = function() {
    return Bork.staticProperty;
  };
}

let myBork = new Bork();

//Property initializers are not on the prototype.
console.log(myBork.__proto__.boundFunction); // > undefined

//Bound functions are bound to the class instance.
console.log(myBork.boundFunction.call(undefined)); // > "bork"

//Static function exists on the class.
console.log(Bork.staticFunction()); // > "babelIsCool"
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-class-properties
```

## Usage

### With a configuration file (Recommended)

Without options:

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-class-properties"]
}
```

With options:

```json title="babel.config.json"
{
  "plugins": [["@babel/plugin-transform-class-properties", { "loose": true }]]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-class-properties script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-class-properties"],
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

When `true`, class properties are compiled to use an assignment expression instead of `Object.defineProperty`.

:::caution
Consider migrating to the top level [`setPublicClassFields`](assumptions.md#setpublicclassfields) assumption
:::

```json title="babel.config.json"
{
  "assumptions": {
    "setPublicClassFields": true
  }
}
```

For an explanation of the consequences of using either, see [Definition vs. Assignment](http://2ality.com/2012/08/property-definition-assignment.html) (TL;DR in Part 5)

#### Example

```js title="JavaScript"
class Bork {
  static a = "foo";
  static b;

  x = "bar";
  y;
}
```

When `setPublicClassFields` is `false`, the above code will compile to the following, using `Object.defineProperty`:

```js title="JavaScript"
var Bork = function Bork() {
  babelHelpers.classCallCheck(this, Bork);
  Object.defineProperty(this, "x", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: "bar",
  });
  Object.defineProperty(this, "y", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: void 0,
  });
};

Object.defineProperty(Bork, "a", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "foo",
});
Object.defineProperty(Bork, "b", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: void 0,
});
```

When `setPublicClassFields` is set to `true`, it will compile using assignment expressions:

```js title="JavaScript"
var Bork = function Bork() {
  babelHelpers.classCallCheck(this, Bork);
  this.x = "bar";
  this.y = void 0;
};

Bork.a = "foo";
Bork.b = void 0;
```

:::tip
You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
:::

## References

- [Proposal: Public and private instance fields](https://github.com/tc39/proposal-class-fields)
- [Proposal: Static class features](https://github.com/tc39/proposal-static-class-features)
