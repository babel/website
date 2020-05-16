---
id: babel-plugin-transform-runtime
title: @babel/plugin-transform-runtime
sidebar_label: transform-runtime
---

A plugin that enables the re-use of Babel's injected helper code to save on codesize.

> NOTE: Instance methods such as `"foobar".includes("foo")` will only work with `core-js@3`. If you need to polyfill them, you can directly import `"core-js"` or use `@babel/preset-env`'s `useBuiltIns` option.

## Installation

Install it as development dependency.

```sh
npm install --save-dev @babel/plugin-transform-runtime
```

and [`@babel/runtime`](runtime.md) as a production dependency (since it's for the "runtime").

```sh
npm install --save @babel/runtime
```

The transformation plugin is typically used only in development, but the runtime itself will be depended on by your deployed code. See the examples below for more details.

## Why?

Babel uses very small helpers for common functions such as `_extend`. By default this will be added to every file that requires it. This duplication is sometimes unnecessary, especially when your application is spread out over multiple files.

This is where the `@babel/plugin-transform-runtime` plugin comes in: all of the helpers will reference the module `@babel/runtime` to avoid duplication across your compiled output. The runtime will be compiled into your build.

Another purpose of this transformer is to create a sandboxed environment for your code. If you directly import [core-js](https://github.com/zloirock/core-js) or [@babel/polyfill](polyfill.md) and the built-ins it provides such as `Promise`, `Set` and `Map`, those will pollute the global scope. While this might be ok for an app or a command line tool, it becomes a problem if your code is a library which you intend to publish for others to use or if you can't exactly control the environment in which your code will run.

The transformer will alias these built-ins to `core-js` so you can use them seamlessly without having to require the polyfill.

See the [technical details](#technical-details) section for more information on how this works and the types of transformations that occur.

## Browserslist Integration

For browser- or Electron-based projects, we recommend using a [`.browserslistrc`](https://github.com/browserslist/browserslist) file to specify targets. You may already have this configuration file as it is used by many tools in the ecosystem, like [autoprefixer](https://github.com/postcss/autoprefixer), [stylelint](https://stylelint.io/), [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat) and many others.

Assuming the `corejs` option is not set to `false`, by default `@babel/plugin-transform-runtime` will use [browserslist config sources](https://github.com/ai/browserslist#queries) _unless_ either the [targets](#targets) or [ignoreBrowserslistConfig](#ignorebrowserslistconfig) options are set.

For example, to only include polyfills and code transforms needed for users whose browsers have >0.25% market share (ignoring browsers without security updates like IE 10 and BlackBerry):

[Options](options.md#presets)

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

**browserslist**

```
> 0.25%
not dead
```

or

**package.json**

```
"browserslist": "> 0.25%, not dead"
```

## Usage

### With a configuration file (Recommended)

Without options:

```json
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

With options (and their defaults, excluding `configPath`):

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "ignoreBrowserslistConfig": false,
        "regenerator": true,
        "targets": {},
        "useESModules": false,
        "version": "7.0.0-beta.0"
      }
    ]
  ]
}
```

The plugin defaults to assuming that all polyfillable APIs will be provided by the user. Otherwise the [`corejs`](#corejs) option needs to be specified.

### Via CLI

```sh
babel --plugins @babel/plugin-transform-runtime script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-runtime"],
});
```

## Options

### `corejs`

`false`, `2`, `3` or `{ version: 2 | 3, proposals: boolean }`, defaults to `false`.

e.g. `['@babel/plugin-transform-runtime', { corejs: 3 }],`

Specifying a number will rewrite the helpers that need polyfillable APIs to reference helpers from that (major) version of `core-js` instead
Please note that `corejs: 2` only supports global variables (e.g. `Promise`) and static properties (e.g. `Array.from`), while `corejs: 3` also supports instance properties (e.g. `[].includes`).

By default, `@babel/plugin-transform-runtime` doesn't polyfill proposals. If you are using `corejs: 3`, you can opt into this by enabling using the `proposals: true` option.

This option requires changing the dependency used to provide the necessary runtime helpers:

| `corejs` option | Install command                             |
| --------------- | ------------------------------------------- |
| `false`         | `npm install --save @babel/runtime`         |
| `2`             | `npm install --save @babel/runtime-corejs2` |
| `3`             | `npm install --save @babel/runtime-corejs3` |

### `helpers`

`boolean`, defaults to `true`.

Toggles whether or not inlined Babel helpers (`classCallCheck`, `extends`, etc.) are replaced with calls to `moduleName`.

For more information, see [Helper aliasing](#helper-aliasing).

### `polyfill`

> This option was removed in v7 by just making it the default.

### `regenerator`

`boolean`, defaults to `true`.

Toggles whether or not generator functions are transformed to use a regenerator runtime that does not pollute the global scope.

When generator functions are supported by your `targets`, generator functions are not transformed to use regenerator runtime even if this option is set to `true`.

For more information, see [Regenerator aliasing](#regenerator-aliasing).

### `targets`

`string | Array<string> | { [string]: string }`, defaults to `{}`.

Describes the environments you support/target for your project.

This can either be a [browserslist-compatible](https://github.com/ai/browserslist) query (with [caveats](#ineffective-browserslist-queries)):

```json
{
  "targets": "> 0.25%, not dead"
}
```

Or an object of minimum environment versions to support:

```json
{
  "targets": {
    "chrome": "58",
    "ie": "11"
  }
}
```

Example environments: `chrome`, `opera`, `edge`, `firefox`, `safari`, `ie`, `ios`, `android`, `node`, `electron`.

Sidenote, if no targets are specified and `corejs` is not set to `false`, then `@babel/plugin-transform-runtime` will transform all ECMAScript 2015+ code by default.

> We don't recommend using `plugin-transfrom-runtime` this way because it doesn't take advantage of its ability to target specific browsers.

```json
{
  "presets": ["@babel/plugin-transform-runtime"]
}
```

#### `targets.esmodules`

`boolean`.

You may also target browsers supporting ES Modules (https://www.ecma-international.org/ecma-262/6.0/#sec-modules). When specifying this option, the browsers field will be ignored. You can use this approach in combination with `<script type="module"></script>` to conditionally serve smaller scripts to users (https://jakearchibald.com/2017/es-modules-in-browsers/#nomodule-for-backwards-compatibility).

> _Please note_: when specifying the esmodules target, browsers targets will be ignored.

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3,
        "targets": {
          "esmodules": true
        }
      }
    ]
  ]
}
```

#### `targets.node`

`string | "current" | true`.

If you want to compile against the current node version, you can specify `"node": true` or `"node": "current"`, which would be the same as `"node": process.versions.node`.

#### `targets.safari`

`string | "tp"`.

If you want to compile against the [technology preview](https://developer.apple.com/safari/technology-preview/) version of Safari, you can specify `"safari": "tp"`.

#### `targets.browsers`

`string | Array<string>`.

A query to select browsers (ex: last 2 versions, > 5%, safari tp) using [browserslist](https://github.com/ai/browserslist).

Note, browsers' results are overridden by explicit items from `targets`.

> Note: this will be removed in later version in favor of just setting "targets" to a query directly.

### `configPath`

`string`, defaults to `process.cwd()`

The starting point where the config search for browserslist will start, and ascend to the system root until found.

### `ignoreBrowserslistConfig`

`boolean`, defaults to `false`

Toggles whether or not [browserslist config sources](https://github.com/ai/browserslist#queries) are used, which includes searching for any browserslist files or referencing the browserslist key inside package.json. This is useful for projects that use a browserslist config for files that won't be compiled with Babel.

### `useBuiltIns`

> This option was removed in v7 by just making it the default.

### `useESModules`

`boolean`, defaults to `false`.

When enabled, the transform will use helpers that do not get run through
`@babel/plugin-transform-modules-commonjs`. This allows for smaller builds in module
systems like webpack, since it doesn't need to preserve commonjs semantics.

For example, here is the `classCallCheck` helper with `useESModules` disabled:

```js
exports.__esModule = true;

exports.default = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
```

And, with it enabled:

```js
export default function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
```

### `absoluteRuntime`

`boolean` or `string`, defaults to `false`.

This allows users to run `transform-runtime` broadly across a whole project. By default, `transform-runtime` imports from `@babel/runtime/foo` directly, but that only works if `@babel/runtime` is in the `node_modules` of the file that is being compiled. This can be problematic for nested `node_modules`, npm-linked modules, or CLIs that reside outside the user's project, among other cases. To avoid worrying about how the runtime module's location is resolved, this allows users to resolve the runtime once up front, and then insert absolute paths to the runtime into the output code.

Using absolute paths is not desirable if files are compiled for use at a later time, but in contexts where a file is compiled and then immediately consumed, they can be quite helpful.

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)

### `version`

By default transform-runtime assumes that `@babel/runtime@7.0.0` is installed. If you have later versions of
`@babel/runtime` (or their corejs counterparts e.g. `@babel/runtime-corejs3`) installed or listed as a dependency, transform-runtime can use more advanced features.

For example if you depend on `@babel/runtime-corejs2@7.7.4` you can transpile your code with
```json
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 2,
        "version": "^7.7.4"
      }
    ]
  ]
}
```
which results in a smaller bundle size.

## Technical details

The `transform-runtime` transformer plugin does three things:

- Automatically requires `@babel/runtime/regenerator` when you use generators/async functions (toggleable with the `regenerator` option).
- Can use `core-js` for helpers if necessary instead of assuming it will be polyfilled by the user (toggleable with the `corejs` option)
- Automatically removes the inline Babel helpers and uses the module `@babel/runtime/helpers` instead (toggleable with the `helpers` option).

What does this actually mean though? Basically, you can use built-ins such as `Promise`, `Set`, `Symbol`, etc., as well use all the Babel features that require a polyfill seamlessly, without global pollution, making it extremely suitable for libraries.

Make sure you include `@babel/runtime` as a dependency.

### Regenerator aliasing

Whenever you use a generator function or async function:

```javascript
function* foo() {}
```

the following is generated:

```javascript
"use strict";

var _marked = [foo].map(regeneratorRuntime.mark);

function foo() {
  return regeneratorRuntime.wrap(
    function foo$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    },
    _marked[0],
    this
  );
}
```

This isn't ideal since it relies on the regenerator runtime being included, which
pollutes the global scope.

With the `runtime` transformer, however, it is compiled to:

```javascript
"use strict";

var _regenerator = require("@babel/runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _marked = [foo].map(_regenerator2.default.mark);

function foo() {
  return _regenerator2.default.wrap(
    function foo$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    },
    _marked[0],
    this
  );
}
```

This means that you can use the regenerator runtime without polluting your current environment.

### `core-js` aliasing

Sometimes you may want to use new built-ins such as `Map`, `Set`, `Promise` etc. Your only way
to use these is usually to include a globally polluting polyfill.

This is with the `corejs` option.

The plugin transforms the following:

```javascript
var sym = Symbol();

var promise = Promise.resolve();

var check = arr.includes("yeah!");

console.log(arr[Symbol.iterator]());
```

into the following:

```javascript
import _getIterator from "@babel/runtime-corejs3/core-js/get-iterator";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";

var sym = _Symbol();

var promise = _Promise.resolve();

var check = _includesInstanceProperty(arr).call(arr, "yeah!");

console.log(_getIterator(arr));
```

This means is that you can seamlessly use these native built-ins and methods
without worrying about where they come from.

**NOTE:** Instance methods such as `"foobar".includes("foo")` will only work when using `corejs: 3`.

### Helper aliasing

Usually Babel will place helpers at the top of your file to do common tasks to avoid
duplicating the code around in the current file. Sometimes these helpers can get a
little bulky and add unnecessary duplication across files. The `runtime`
transformer replaces all the helper calls to a module.

That means that the following code:

```javascript
class Person {}
```

usually turns into:

```javascript
"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Person = function Person() {
  _classCallCheck(this, Person);
};
```

the `runtime` transformer however turns this into:

```javascript
"use strict";

var _classCallCheck2 = require("@babel/runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Person = function Person() {
  (0, _classCallCheck3.default)(this, Person);
};
```

## Caveats

### Ineffective browserslist queries

While `op_mini all` is a valid browserslist query, `plugin-transform-runtime` currently ignores it due to [lack of support data](https://github.com/kangax/compat-table/issues/1057) for Opera Mini.
