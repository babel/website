---
id: babel-plugin-proposal-filtered-namespaces
title: "@babel/plugin-proposal-filtered-namespaces"
sidebar_label: filtered-namespaces
---

Transforms filtered namespace imports and re-exports (`import { a, b } as ns from "mod"`), and the `exports` option of dynamic `import()`.

Filtered namespaces are part of the [Deferred Re-exports](https://github.com/tc39/proposal-deferred-reexports) proposal. They let you import a namespace object that only exposes some of the exports of a module.

:::info
This plugin only compiles filtered namespaces. To parse `export defer` declarations, you need to enable the [`deferredReexports`](./parser.md#ecmascript-proposals) parser plugin. Babel does not support transpiling `export defer`.
:::

## Example

### Static imports and re-exports

```js title="input.js"
import { a, b } as ns from "mod";

ns.a;
```

will be transformed to

```js title="output.js"
const ns = Object.freeze(Object.defineProperty({
  __proto__: null,
  get a() {
    return _a;
  },
  get b() {
    return _b;
  }
}, Symbol.toStringTag, {
  value: "Module"
}));
import { a as _a, b as _b } from "mod";
ns.a;
```

Re-exports are compiled in the same way:

```js title="input.js"
export { a, b } as ns from "mod";
```

```js title="output.js"
const _ns = Object.freeze(Object.defineProperty({
  __proto__: null,
  get a() {
    return _a;
  },
  get b() {
    return _b;
  }
}, Symbol.toStringTag, {
  value: "Module"
}));
import { a as _a, b as _b } from "mod";
export { _ns as ns };
```

The generated code still uses ES modules, so it can be combined with any of Babel's modules transforms, such as [`@babel/plugin-transform-modules-commonjs`](./plugin-transform-modules-commonjs.md).

### Dynamic imports

```js title="input.js"
import("mod", { exports: ["b", "a"] });
```

will be transformed to

```js title="output.js"
var _exports;
import("mod", {
  exports: _exports = ["a", "b"]
}).then(babelHelpers.createModuleNsFilter(_exports));
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-filtered-namespaces
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-proposal-filtered-namespaces"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-proposal-filtered-namespaces script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-filtered-namespaces"],
});
```

## Caveats

Babel does not support transforming filtered namespaces that are combined with `import defer` or `export defer` yet, such as `import defer { a } as ns from "mod"` or `export defer { a } as ns from "mod"`.

## References

- [Proposal: Deferred Re-exports](https://github.com/tc39/proposal-deferred-reexports)
