---
id: babel-plugin-transform-runtime
title: "@babel/plugin-transform-runtime"
---

A plugin that enables the re-use of Babel's injected helper code to save on codesize.



## Installation

Install it as development dependency.

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-runtime
```

and [`@babel/runtime`](runtime.md) as a production dependency (since it's for the "runtime").

```shell npm2yarn
npm install --save @babel/runtime
```

The transformation plugin is typically used only in development, but the runtime itself will be depended on by your deployed code. See the examples below for more details.

:::danger
When this plugin is enabled, the `useBuiltIns` option in `@babel/preset-env` must not be set. Otherwise, this plugin may not able to completely sandbox the environment.
:::

## Why?

Babel uses very small helpers for common functions such as `_extend`. By default this will be added to every file that requires it. This duplication is sometimes unnecessary, especially when your application is spread out over multiple files.

This is where the `@babel/plugin-transform-runtime` plugin comes in: all of the helpers will reference the module `@babel/runtime` to avoid duplication across your compiled output. The runtime will be compiled into your build.



See the [technical details](#technical-details) section for more information on how this works and the types of transformations that occur.

## Usage

### With a configuration file (Recommended)

Without options:

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

With options (and their defaults):

```json title="babel.config.json"
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "version": "7.0.0-beta.0"
      }
    ]
  ]
}
```

The plugin assumes that all polyfillable APIs will be provided by the user. See [babel-polyfills](https://github.com/babel/babel-polyfills) for more information.



### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-runtime script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-runtime"],
});
```

### In a Node.js application

When building a Node.js application (not just transforming files), you can integrate `@babel/plugin-transform-runtime` with [`@babel/register`](register.md) so that helpers are shared at runtime:

**1. Install the required packages:**

```shell npm2yarn
npm install --save-dev @babel/core @babel/register @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

**2. Create a Babel config file:**

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

**3. Create an entry file that hooks into Node's `require`:**

```js title="register.js"
require("@babel/register")({
  // Only transpile files in src/, not node_modules
  ignore: [/node_modules/],
});

// Now require your app entry point — it will be transpiled on the fly
require("./src/index");
```

**4. Run your app:**

```shell title="Shell"
node register.js
```

With this setup, all `require()`d files under `src/` will be compiled by Babel. Shared helpers from `@babel/runtime` are `require()`d once and reused across all compiled files, avoiding inline helper duplication.

:::tip
For production use, consider pre-compiling your source with the Babel CLI (`babel src --out-dir dist`) so helpers are resolved at build time rather than at Node startup.
:::

## Options


### `absoluteRuntime`

`boolean` or `string`, defaults to `false`.

This allows users to run `transform-runtime` broadly across a whole project. By default, `transform-runtime` imports from `@babel/runtime/foo` directly, but that only works if `@babel/runtime` is in the `node_modules` of the file that is being compiled. This can be problematic for nested `node_modules`, npm-linked modules, or CLIs that reside outside the user's project, among other cases. To avoid worrying about how the runtime module's location is resolved, this allows users to resolve the runtime once up front, and then insert absolute paths to the runtime into the output code.

Using absolute paths is not desirable if files are compiled for use at a later time, but in contexts where a file is compiled and then immediately consumed, they can be quite helpful.

:::tip
You can read more about configuring plugin options [here](./plugins.md#plugin-options)
:::

### `corejs`



:::danger

This option has been removed in Babel 8. To inject polyfills, you can use [`babel-plugin-polyfill-corejs3`](https://github.com/babel/babel-polyfills/blob/main/packages/babel-plugin-polyfill-corejs3/README.md) directly.

:::

### `helpers`



:::danger

The `helpers` option has been removed in Babel 8, as this plugin will only be used to inject helpers (including `regeneratorRuntime`, which will be handled as any other Babel helper).

:::

### `moduleName`

<details>
  <summary>History</summary>

| Version | Changes |
| --- | --- |
| `v7.24.0` | Added `moduleName` option |
</details>

`string`, defaults to `@babel/runtime`.

This option controls which package of helpers `@babel/plugin-transform-runtime` will use when injecting imports. It uses the following priority:
- `moduleName` option, if specified
- Helpers module suggested by any `babel-plugin-polyfill-*` plugin
  - `babel-plugin-polyfill-corejs3` suggests `@babel/runtime-corejs3`
  - `babel-plugin-polyfill-corejs2` suggests `@babel/runtime-corejs2`
- Fallback to `@babel/runtime`





### `version`



By default transform-runtime assumes that `@babel/runtime@8.0.0` is installed. If you have later versions of
`@babel/runtime` (or their corejs counterparts e.g. `@babel/runtime-corejs3`) installed or listed as a dependency, transform-runtime can use more advanced features.


For example if you depend on `@babel/runtime@^8.1.0` you can transpile your code with

```json title="babel.config.json"
{
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "version": "^8.1.0"
    }]
  ]
}
```

which results in a smaller bundle size.

## Technical details



### Helper aliasing

Usually Babel will place helpers at the top of your file to do common tasks to avoid
duplicating the code around in the current file. Sometimes these helpers can get a
little bulky and add unnecessary duplication across files. The `runtime`
transformer replaces all the helper calls to a module.

That means that the following code:

```js title="JavaScript"
class Person {}
```

usually turns into:

```js title="JavaScript"
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

```js title="JavaScript"
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

## Removed options

The following options were removed in Babel 8.0.0:
- `corejs`
- `helpers`
- `regenerator`

The following options were removed in Babel 7.0.0:
- `useBuiltIns`
- `polyfill`
