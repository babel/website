---
id: babel-plugin-proposal-private-methods
title: @babel/plugin-proposal-private-methods
sidebar_label: private-methods
---

> **NOTE**: This plugin is included in `@babel/preset-env`

<details>
<summary>History</summary>
| Version | Changes |
| --- | --- |
| `v7.3.0` | Support private accessors (getters and setters) |
| `v7.2.0` | Initial Release |
</details>

## Example

```js
class Counter extends HTMLElement {
  #xValue = 0;

  get #x() {
    return this.#xValue;
  }
  set #x(value) {
    this.#xValue = value;
    window.requestAnimationFrame(this.#render.bind(this));
  }

  #clicked() {
    this.#x++;
  }
}
```

## Installation

```sh
$ npm install @babel/plugin-proposal-private-methods --save-dev
```

## Usage

### With a configuration file (Recommended)

Without options:

```json
{
  "plugins": ["@babel/plugin-proposal-private-methods"]
}
```

With options:

```json
{
  "plugins": [["@babel/plugin-proposal-private-methods", { "loose": true }]]
}
```

### Via CLI

```sh
$ babel --plugins @babel/plugin-proposal-private-methods script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-private-methods"],
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

> Note: The `loose` mode configuration setting _must_ be the same as [`@babel/plugin-proposal-class-properties`](plugin-proposal-class-properties.md).

When true, private methods will be assigned directly on its parent
via `Object.defineProperty` rather than a `WeakSet`. This results in improved
performance and debugging (normal property access vs `.get()`) at the expense
of potentially leaking "privates" via things like `Object.getOwnPropertyNames`.

> ⚠️ Consider migrating to the top level [`privateFieldsAsProperties`](assumptions.md#privatefieldsasproperties) assumption.

```jsonc
// babel.config.json
{
  "assumptions": {
    "privateFieldsAsProperties": true,
    "setPublicClassFields": true
  }
}
```

Note that both `privateFieldsAsProperties` and `setPublicClassFields` must be set to `true`.

Let's use the following as an example:

```javascript
class Foo {
  constructor() {
    this.publicField = this.#privateMethod();
  }

  #privateMethod() {
    return 42;
  }
}
```

By default, this becomes:

```javascript
var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _privateMethod.add(this);

  this.publicField = babelHelpers
    .classPrivateMethodGet(this, _privateMethod, _privateMethod2)
    .call(this);
};

var _privateMethod = new WeakSet();

var _privateMethod2 = function _privateMethod2() {
  return 42;
};
```

With `{ privateFieldsAsProperties: true }`, it becomes:

```javascript
var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _privateMethod, {
    value: _privateMethod2,
  });
  this.publicField = babelHelpers
    .classPrivateFieldLooseBase(this, _privateMethod)
    [_privateMethod]();
};

var _privateMethod = babelHelpers.classPrivateFieldLooseKey("privateMethod");

var _privateMethod2 = function _privateMethod2() {
  return 42;
};
```

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)

## References

- [Proposal: Private methods and getter/setters for JavaScript classes](https://github.com/tc39/proposal-private-methods)
