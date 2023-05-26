---
id: babel-plugin-transform-object-rest-spread
title: "@babel/plugin-transform-object-rest-spread"
sidebar_label: object-rest-spread
---

> **NOTE**: This plugin is included in `@babel/preset-env`, in [ES2018](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

## Example

### Rest Properties

```js title="JavaScript"
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }
```

### Spread Properties

```js title="JavaScript"
let n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-object-rest-spread
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-object-rest-spread"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-object-rest-spread script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-object-rest-spread"],
});
```

## Options

By default, this plugin will produce spec compliant code by using Babel's `objectSpread` helper.

### `loose`

`boolean`, defaults to `false`.

Enabling this option will use Babel's `extends` helper, which is basically the same as `Object.assign` (see `useBuiltIns` below to use it directly).

> ⚠️ Consider migrating to the top level [`setSpreadProperties`](assumptions.md#setspreadproperties) assumption.

```json title="babel.config.json"
{
  "assumptions": {
    "setSpreadProperties": true
  }
}
```

Please keep in mind that even if they're almost equivalent, there's an important difference between spread and `Object.assign`: **spread _defines_ new properties, while `Object.assign()` _sets_ them**, so using this mode might produce unexpected results in some cases.

For detailed information please check out [Spread VS. Object.assign](http://2ality.com/2016/10/rest-spread-properties.html#spreading-objects-versus-objectassign) and [Assigning VS. defining properties](http://exploringjs.com/es6/ch_oop-besides-classes.html#sec_assigning-vs-defining-properties).

### `useBuiltIns`

`boolean`, defaults to `false`.

Enabling this option will use `Object.assign` directly instead of the Babel's `extends` helper.

##### Example

**.babelrc**

```json title="JSON"
{
  "assumptions": {
    "setSpreadProperties": true
  },
  "plugins": [
    ["@babel/plugin-transform-object-rest-spread", { "useBuiltIns": true }]
  ]
}
```

**In**

```js title="JavaScript"
z = { x, ...y };
```

**Out**

```js title="JavaScript"
z = Object.assign({ x }, y);
```

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)

## References

- [Proposal: Object Rest/Spread Properties for ECMAScript](https://github.com/tc39/proposal-object-rest-spread)
- [Spec](https://tc39.github.io/transform-object-rest-spread/)
- [Spread VS. Object.assign](http://2ality.com/2016/10/rest-spread-properties.html#spreading-objects-versus-objectassign)
- [Assigning VS. defining properties](http://exploringjs.com/es6/ch_oop-besides-classes.html#sec_assigning-vs-defining-properties)
