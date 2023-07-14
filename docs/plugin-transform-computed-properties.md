---
id: babel-plugin-transform-computed-properties
title: "@babel/plugin-transform-computed-properties"
sidebar_label: computed-properties
---

:::info
This plugin is included in `@babel/preset-env`
:::

## Example

**In**

```js title="JavaScript"
var obj = {
  ["x" + foo]: "heh",
  ["y" + bar]: "noo",
  foo: "foo",
  bar: "bar",
};
```

**Out**

```js title="JavaScript"
var _obj;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var obj = ((_obj = {}),
_defineProperty(_obj, "x" + foo, "heh"),
_defineProperty(_obj, "y" + bar, "noo"),
_defineProperty(_obj, "foo", "foo"),
_defineProperty(_obj, "bar", "bar"),
_obj);
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-computed-properties
```

## Usage

### With a configuration file (Recommended)

Without options:

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-computed-properties"]
}
```

With options:

```json title="babel.config.json"
{
  "plugins": [
    [
      "@babel/plugin-transform-computed-properties",
      {
        "loose": true
      }
    ]
  ]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-computed-properties script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-computed-properties"],
});
```

## Options

### `loose`

`boolean`, defaults to `false`

Just like method assignment in classes, in loose mode, computed property names
use simple assignments instead of being defined. This is unlikely to be an issue
in production code.

:::caution
Consider migrating to the top level [`setComputedProperties`](assumptions.md#setcomputedproperties) assumption.
:::

```json title="babel.config.json"
{
  "assumptions": {
    "setComputedProperties": true
  }
}
```

#### Example

**_In_**

```js title="JavaScript"
var obj = {
  ["x" + foo]: "heh",
  ["y" + bar]: "noo",
  foo: "foo",
  bar: "bar",
};
```

**_Out_**

When `setComputedProperties` is `true`.

```js title="JavaScript"
var _obj;

var obj = ((_obj = {}),
(_obj["x" + foo] = "heh"),
(_obj["y" + bar] = "noo"),
(_obj.foo = "foo"),
(_obj.bar = "bar"),
_obj);
```

When `setComputedProperties` is `false`.

```js title="JavaScript"
import _defineProperty from "@babel/runtime/helpers/defineProperty";

var _obj;

var obj = ((_obj = {}),
_defineProperty(_obj, "x" + foo, "heh"),
_defineProperty(_obj, "y" + bar, "noo"),
_defineProperty(_obj, "foo", "foo"),
_defineProperty(_obj, "bar", "bar"),
_obj);
```

:::tip
You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
:::
