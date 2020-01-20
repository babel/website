---
id: version-7.0.0-babel-plugin-transform-computed-properties
title: @babel/plugin-transform-computed-properties
sidebar_label: transform-computed-properties
original_id: babel-plugin-transform-computed-properties
---

## Example

**In**

```js
var obj = {
  ["x" + foo]: "heh",
  ["y" + bar]: "noo",
  foo: "foo",
  bar: "bar"
};
```

**Out**

```js
var _obj;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var obj = (
  _obj = {},
  _defineProperty(_obj, "x" + foo, "heh"),
  _defineProperty(_obj, "y" + bar, "noo"),
  _defineProperty(_obj, "foo", "foo"),
  _defineProperty(_obj, "bar", "bar"),
  _obj
);
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-computed-properties
```

## Usage

### With a configuration file (Recommended)

Without options:

```json
{
  "plugins": ["@babel/plugin-transform-computed-properties"]
}
```

With options:

```json
{
  "plugins": [
    ["@babel/plugin-transform-computed-properties", {
      "loose": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-computed-properties script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-computed-properties"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`

Just like method assignment in classes, in loose mode, computed property names
use simple assignments instead of being defined. This is unlikely to be an issue
in production code.

#### Example

***In***

```js
var obj = {
  ["x" + foo]: "heh",
  ["y" + bar]: "noo",
  foo: "foo",
  bar: "bar"
};
```

***Out***

```js
var _obj;

var obj = (
  _obj = {},
  _obj["x" + foo] = "heh",
  _obj["y" + bar] = "noo",
  _obj.foo = "foo",
  _obj.bar = "bar",
  _obj
);
```

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
