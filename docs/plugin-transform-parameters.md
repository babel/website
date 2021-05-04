---
id: babel-plugin-transform-parameters
title: @babel/plugin-transform-parameters
sidebar_label: parameters
---

> **NOTE**: This plugin is included in `@babel/preset-env`

This plugin transforms ES2015 parameters to ES5, this includes:

- Destructuring parameters
- Default parameters
- Rest parameters

## Examples

**In**

```javascript
function test(x = "hello", { a, b }, ...args) {
  console.log(x, a, b, args);
}
```

**Out**

```javascript
function test() {
  var x =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "hello";
  var _ref = arguments[1];
  var a = _ref.a,
    b = _ref.b;

  for (
    var _len = arguments.length,
      args = Array(_len > 2 ? _len - 2 : 0),
      _key = 2;
    _key < _len;
    _key++
  ) {
    args[_key - 2] = arguments[_key];
  }

  console.log(x, a, b, args);
}
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-parameters
```

## Caveats

Default parameters desugar into `let` declarations to retain proper semantics. If this is
not supported in your environment then you'll need the
[@babel/plugin-transform-block-scoping](plugin-transform-block-scoping.md) plugin.

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-parameters"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-parameters script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-parameters"],
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

In loose mode, parameters with default values will be counted into the arity of the function. This is not spec behavior where these parameters do not add to function arity.

> ⚠️ Consider migrating to the top level [`ignoreFunctionLength`](assumptions.md#ignorefunctionlength) assumption.

```jsonc
// babel.config.json
{
  "assumptions": {
    "ignoreFunctionLength": true
  }
}
```

Under the `ignoreFunctionLength` assumption, Babel will generate a more performant solution as JavaScript engines will fully optimize a function that doesn't reference `arguments`. Please do your own benchmarking and determine if this option is the right fit for your application.

```javascript
// Spec behavior
function bar1(arg1 = 1) {}
bar1.length; // 0

// ignoreFunctionLength: true
function bar1(arg1 = 1) {}
bar1.length; // 1
```

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
