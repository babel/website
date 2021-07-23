---
id: babel-plugin-transform-modules-umd
title: @babel/plugin-transform-modules-umd
sidebar_label: UMD
---

> **NOTE**: This plugin is included in `@babel/preset-env` under the `modules` option

This plugin transforms ES2015 modules to [UMD](https://github.com/umdjs/umd). Note that only the _syntax_ of import/export statements (`import "./mod.js"`) is transformed, as Babel is unaware of different resolution algorithms between implementations of ES2015 modules and UMD.

⚠️ This plugin does not support dynamic import (`import('./lazy.js')`).

## Example

**In**

```javascript
export default 42;
```

**Out**

```javascript
(function(global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {},
    };
    factory(mod.exports);
    global.actual = mod.exports;
  }
})(this, function(exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true,
  });

  exports.default = 42;
});
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-modules-umd
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-modules-umd"]
}
```

You can also override the names of particular libraries when this module is
running in the browser. For example the `es6-promise` library exposes itself
as `global.Promise` rather than `global.es6Promise`. This can be accommodated by:

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-modules-umd",
      {
        "globals": {
          "es6-promise": "Promise"
        }
      }
    ]
  ]
}
```

#### Default semantics

There are a few things to note about the default semantics.

_First_, this transform uses the
[basename](https://en.wikipedia.org/wiki/Basename) of each import to generate
the global names in the UMD output. This means that if you're importing
multiple modules with the same basename, like:

```js
import fooBar1 from "foo-bar";
import fooBar2 from "./mylib/foo-bar";
```

it will transpile into two references to the same browser global:

```js
factory(global.fooBar, global.fooBar);
```

If you set the plugin options to:

```json
{
  "globals": {
    "foo-bar": "fooBAR",
    "./mylib/foo-bar": "mylib.fooBar"
  }
}
```

it will still transpile both to one browser global:

```js
factory(global.fooBAR, global.fooBAR);
```

because again the transform is only using the basename of the import.

_Second_, the specified override will still be passed to the `toIdentifier`
function in [babel-types/src/converters](https://github.com/babel/babel/blob/main/packages/babel-types/src/converters).
This means that if you specify an override as a member expression like:

```json
{
  "globals": {
    "fizzbuzz": "fizz.buzz"
  }
}
```

this will _not_ transpile to `factory(global.fizz.buzz)`. Instead, it will
transpile to `factory(global.fizzBuzz)` based on the logic in `toIdentifier`.

_Third_, you cannot override the exported global name.

#### More flexible semantics with `exactGlobals: true`

All of these behaviors can limit the flexibility of the `globals` map. To
remove these limitations, you can set the `exactGlobals` option to `true`.
Doing this instructs the plugin to:

1. always use the full import string instead of the basename when generating
   the global names
2. skip passing `globals` overrides to the `toIdentifier` function. Instead,
   they are used exactly as written, so you will get errors if you do not use
   valid identifiers or valid uncomputed (dot) member expressions.
3. allow the exported global name to be overridden via the `globals` map. Any
   override must again be a valid identifier or valid member expression.

Thus, if you set `exactGlobals` to `true` and do not pass any overrides, the
first example of:

```js
import fooBar1 from "foo-bar";
import fooBar2 from "./mylib/foo-bar";
```

will transpile to:

```js
factory(global.fooBar, global.mylibFooBar);
```

And if you set the plugin options to:

```json
{
  "globals": {
    "foo-bar": "fooBAR",
    "./mylib/foo-bar": "mylib.fooBar"
  },
  "exactGlobals": true
}
```

then it'll transpile to:

```js
factory(global.fooBAR, global.mylib.fooBar);
```

Finally, with the plugin options set to:

```json
{
  "plugins": [
    "@babel/plugin-external-helpers",
    [
      "@babel/plugin-transform-modules-umd",
      {
        "globals": {
          "my/custom/module/name": "My.Custom.Module.Name"
        },
        "exactGlobals": true
      }
    ]
  ],
  "moduleId": "my/custom/module/name"
}
```

it will transpile to:

```js
factory(mod.exports);
global.My = global.My || {};
global.My.Custom = global.My.Custom || {};
global.My.Custom.Module = global.My.Custom.Module || {};
global.My.Custom.Module.Name = mod.exports;
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-modules-umd script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-modules-umd"],
});
```
