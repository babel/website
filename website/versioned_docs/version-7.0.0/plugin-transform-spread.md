---
id: version-7.0.0-babel-plugin-transform-spread
title: @babel/plugin-transform-spread
sidebar_label: transform-spread
original_id: babel-plugin-transform-spread
---

## Example

**In**

```js
var a = ['a', 'b', 'c'];

var b = [...a, 'foo'];

var c = foo(...a);
```

**Out**

```js
var a = ['a', 'b', 'c'];

var b = a.concat(['foo']);

var c = foo.apply(void 0, a);
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-spread
```

## Usage

### With a configuration file (Recommended)

Without options:

```json
{
  "plugins": ["@babel/plugin-transform-spread"]
}
```

With options:

```json
{
  "plugins": [
    ["@babel/plugin-transform-spread", {
      "loose": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-spread script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-spread"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

In loose mode, **all** iterables are assumed to be arrays.

Loose mode preserves "holes" when spreading an array (for example, `[ ...Array(2) ]` produces `[ (hole), (hole) ]`). Set loose to `false` to avoid this behaviour.

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)

## References

* [MDN: Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
