---
id: babel-plugin-proposal-decorators
title: "@babel/plugin-proposal-decorators"
sidebar_label: decorators
---

## Example

### Simple class decorator

```js title="JavaScript"
@annotation
class MyClass {}

function annotation(target) {
  target.annotated = true;
}
```

### Class decorator

```js title="JavaScript"
@isTestable(true)
class MyClass {}

function isTestable(value) {
  return function decorator(target) {
    target.isTestable = value;
  };
}
```

### Class method decorator {#class-function-decorator}

```js title="JavaScript"
class C {
  message = "hello!";

  @bound
  m() {
    console.log(this.message);
  }
}

function bound(value, { name, addInitializer }) {
  addInitializer(function () {
    this[name] = this[name].bind(this);
  });
}
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-decorators
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "version": "2023-11" }]
  ]
}
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: [
    ["@babel/plugin-proposal-decorators", { version: "2023-11" }],
  ]
});
```

## Options

<details>
  <summary>History</summary>

| Version | Changes |
| --- | --- |
| `v7.24.0` | Added support for `version: "2023-11"` |
| `v7.22.0` | Added support for `version: "2023-05"` |
| `v7.21.0` | Added support for `version: "2023-01"` |
| `v7.19.0` | Added support for `version: "2022-03"` |
| `v7.17.0` | Added the `version` option with support for `"2021-12"`, `"2018-09"` and `"legacy"` |
</details>

### `version`

`"2023-11"` or `"legacy"`.

Selects the decorators proposal to use:
- `"2023-11"` is the proposal version after the updates that reached consensus in the November 2023 TC39 meeting. This version will be enabled by default if it ends up being the final one. It allows decorators either before or after `export`.
- `legacy` is the legacy Stage 1 proposal, defined at [`wycats/javascript-decorators@e1bf8d41bf`](https://github.com/wycats/javascript-decorators/blob/e1bf8d41bfa2591d949dd3bbf013514c8904b913/README.md). The legacy mode will not have feature updates, and there are known [discrepancies between Babel and TypeScript](https://github.com/babel/babel/issues/8864#issuecomment-688535867). It is recommended to migrate to the `"2023-11"` proposal version.

The spec repo provides a brief [summary of the differences between these versions](https://github.com/tc39/proposal-decorators#how-does-this-proposal-compare-to-other-versions-of-decorators).



## `Symbol.metadata` notes

When using decorators which either access or modify the metadata in the decorator context, you need to use `Symbol.metadata`. When `Symbol.metadata` is not available, Babel defaults to `Symbol.for("Symbol.metadata")`: this may be incompatible with other packages that use a different fallback.

To ensure that `Symbol.metadata` is available globally and matches the symbol used by the Babel decorators plugin during transpilation, you will need to either include a polyfill that defines it, or define it yourself:

```js title="symbol-metadata-polyfill.js"
Symbol.metadata = Symbol.for("Symbol.metadata");
```

You can also use a third-party polyfill, such as `core-js/proposals/decorator-metadata-v2.js`. Make sure that the polyfill is executed before any code that uses decorators or accesses `Symbol.metadata`.

## References

- [Proposal: JavaScript Decorators](https://github.com/tc39/proposal-decorators)
