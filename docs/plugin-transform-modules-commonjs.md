---
id: babel-plugin-transform-modules-commonjs
title: @babel/plugin-transform-modules-commonjs
sidebar_label: Common JS
---

<details>
  <summary>History</summary>
| Version | Changes |
| --- | --- |
| `v7.14.0` | Implemented the `importInterop` option |
</details>

> **NOTE**: This plugin is included in `@babel/preset-env` under the `modules` option

This plugin transforms ECMAScript modules to [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1). Note that only the _syntax_ of import/export statements (`import "./mod.js"`) and import expressions (`import('./mod.js')`) is transformed, as Babel is unaware of different resolution algorithms between implementations of ECMAScript modules and CommonJS.

## Example

**In**

```javascript
export default 42;
```

**Out**

```javascript
Object.defineProperty(exports, "__esModule", {
  value: true,
});

exports.default = 42;
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-modules-commonjs
```

## Usage

### With a configuration file (Recommended)

```js
// without options
{
  "plugins": ["@babel/plugin-transform-modules-commonjs"]
}

// with options
{
  "plugins": [
    ["@babel/plugin-transform-modules-commonjs", {
      "allowTopLevelThis": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-modules-commonjs script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-modules-commonjs"],
});
```

## Options

### `importInterop`

`"babel" | "node" | "none"`, or `(specifier: string, requestingFilename: string | undefined) => "babel" | "node" | "none"`. Defaults to `"babel"`.

CommonJS modules and ECMAScript modules are not fully compatible. However, compilers, bundlers and JavaScript
runtimes developed different strategies to make them work together as well as possible.

This option specify which interop strategy Babel should use. When it's a function, Babel calls it passing the import specifier and the importer path. For example, when compiling a `/full/path/to/foo.js` file containing `import { a } from 'b'`, Babel will call it with parameters `('b', '/full/path/to/foo.js')`.

#### `"babel"`

When using exports with babel a non-enumerable `__esModule` property is exported. This property is then used to determine if the import _is_ the default export or if it _contains_ the default export.

```javascript
import foo from "foo";
import { bar } from "bar";
foo;
bar;

// Is compiled to ...

"use strict";

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _foo = _interopRequireDefault(require("foo"));
var _bar = require("bar");

_foo.default;
_bar.bar;
```

When this import interop is used, if both the imported and the importer module are compiled with Babel they behave as if none of them was compiled.

This is the default behavior.

#### `"node"`

When importing CommonJS files (either directly written in CommonJS, or generated with a compiler) Node.js always binds the `default` export to the value of `module.exports`.

```javascript
import foo from "foo";
import { bar } from "bar";
foo;
bar;

// Is compiled to ...

"use strict";

var _foo = require("foo");
var _bar = require("bar");

_foo;
_bar.bar;
```

This is not exactly the same as what Node.js does since Babel allows accessing any property of `module.exports` as a named export, while Node.js only allows importing _statically analyzable_ properties of `module.exports`. However, any import working in Node.js will also work when compiled with Babel using `importInterop: "node"`.

#### `"none"`

If you know that the imported file has been transformed with a compiler that stores the `default` export on `exports.default` (such as Babel), you can safely omit the `_interopRequireDefault` helper.

```javascript
import foo from "foo";
import { bar } from "bar";
foo;
bar;

// Is compiled to ...

"use strict";

var _foo = require("foo");
var _bar = require("bar");

_foo.default;
_bar.bar;
```

### `loose`

`boolean`, defaults to `false`.

By default, when using exports with babel a non-enumerable `__esModule` property
is exported.

```javascript
var foo = (exports.foo = 5);

Object.defineProperty(exports, "__esModule", {
  value: true,
});
```

> ⚠️ Consider migrating to the top level [`enumerableModuleMeta`](assumptions.md#enumerablemodulemeta) assumption.

```jsonc
// babel.config.json
{
  "assumptions": {
    "enumerableModuleMeta": true
  }
}
```

In environments that don't support this you can enable the `enumerableModuleMeta` assumption, instead of using `Object.defineProperty` an assignment will be used instead.

```javascript
var foo = (exports.foo = 5);
exports.__esModule = true;
```

### `strict`

`boolean`, defaults to `false`

By default, when using exports with babel a non-enumerable `__esModule` property
is exported. In some cases this property is used to determine if the import _is_ the
default export or if it _contains_ the default export.

```javascript
var foo = (exports.foo = 5);

Object.defineProperty(exports, "__esModule", {
  value: true,
});
```

In order to prevent the `__esModule` property from being exported, you can set
the `strict` option to `true`.

### `lazy`

`boolean`, `Array<string>`, or `(string) => boolean`, defaults to `false`

Changes Babel's compiled `import` statements to be lazily evaluated when their
imported bindings are used for the first time.

This can improve initial load time of your module because evaluating
dependencies up front is sometimes entirely un-necessary. This is especially
the case when implementing a library module.

The value of `lazy` has a few possible effects:

- `false` - No lazy initialization of any imported module.
- `true` - Do not lazy-initialize local `./foo` imports, but lazy-init `foo` dependencies.

  Local paths are much more likely to have circular dependencies, which may break if loaded lazily,
  so they are not lazy by default, whereas dependencies between independent modules are rarely cyclical.

- `Array<string>` - Lazy-initialize all imports with source matching one of the given strings.
- `(string) => boolean` - Pass a callback that will be called to decide if a given source string should be lazy-loaded.

The two cases where imports can never be lazy are:

- `import "foo";`

  Side-effect imports are automatically non-lazy since their very existence means
  that there is no binding to later kick off initialization.

- `export * from "foo"`

  Re-exporting all names requires up-front execution because otherwise there is no
  way to know what names need to be exported.

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)

### `noInterop`

`boolean`, defaults to `false`

> ⚠️ **Deprecated**: Use the `importInterop` option instead.

When set to `true`, this option has the same behavior as setting `importInterop: "none"`.

## Relevant [`assumptions`](https://babeljs.io/docs/en/assumptions)

- [`enumerableModuleMeta`](https://babeljs.io/docs/en/assumptions#enumerablemodulemeta)
- [`noIncompleteNsImportDetection`](https://babeljs.io/docs/en/assumptions#noincompletensimportdetection)
