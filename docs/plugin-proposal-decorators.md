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

:::babel8

### `version`

`"2023-11"` or `"legacy"`.

Selects the decorators proposal to use:
- `"2023-11"` is the proposal version after the updates that reached consensus in the November 2023 TC39 meeting. This version will be enabled by default if it ends up being the final one.
- `legacy` is the legacy Stage 1 proposal, defined at [`wycats/javascript-decorators@e1bf8d41bf`](https://github.com/wycats/javascript-decorators/blob/e1bf8d41bfa2591d949dd3bbf013514c8904b913/README.md). The legacy mode will not have feature updates, and there are known [discrepancies between Babel and TypeScript](https://github.com/babel/babel/issues/8864#issuecomment-688535867). It is recommended to migrate to the `"2023-11"` proposal version.

:::

::::babel7

### `version`

`"2023-11"`, `"2023-05"`, `"2023-01"`, `"2022-03"`, `"2021-12"`, `"2018-09"` or `"legacy"`.

Selects the decorators proposal to use:
- `"2023-11"` is the proposal version after the updates that reached consensus in the November 2023 TC39 meetings, intergrating [this change](https://github.com/pzuraq/ecma262/pull/12)
- `"2023-05"` is the proposal version after the updates that reached consensus in the March and May 2023 TC39 meetings, integrating [these changes](https://github.com/pzuraq/ecma262/compare/e86128e13b63a3c2efc3728f76c8332756752b02...c4465e44d514c6c1dba810487ec2721ccd6b08f9).
- `"2023-01"` is the proposal version after the updates that reached consensus in the January 2023 TC39 meeting, integrating [`pzuraq/ecma262#4`](https://github.com/pzuraq/ecma262/pull/4).
- `"2022-03"` is the proposal version that reached consensus for Stage 3 in the March 2022 TC39 meeting. You can read more about it at [`tc39/proposal-decorators@8ca65c046d`](https://github.com/tc39/proposal-decorators/tree/8ca65c046dd5e9aa3846a1fe5df343a6f7efd9f8).
- `"2021-12"` is the proposal version as it was presented to TC39 in Dec 2021. You can read more about it at [`tc39/proposal-decorators@d6c056fa06`](https://github.com/tc39/proposal-decorators/tree/d6c056fa061646178c34f361bad33d583316dc85).
- `"2018-09"` is the proposal version that was initially promoted to Stage 2 presented to TC39 in Sept 2018.  You can read more about it at [`tc39/proposal-decorators@7fa580b40f`](https://github.com/tc39/proposal-decorators/tree/7fa580b40f2c19c561511ea2c978e307ae689a1b).
- `legacy` is the legacy Stage 1 proposal, defined at [`wycats/javascript-decorators@e1bf8d41bf`](https://github.com/wycats/javascript-decorators/blob/e1bf8d41bfa2591d949dd3bbf013514c8904b913/README.md). The legacy mode will not have feature updates, and there are known [discrepancies between Babel and TypeScript](https://github.com/babel/babel/issues/8864#issuecomment-688535867). It's recommended to migrate to the `"2023-11"` proposal.

:::caution
Babel 8 will only support `"2023-11"` and `"legacy"`. If you are using a different decorators version, it's recommended to migrate to `"2023-11"`.
:::

The spec repo provides a brief [summary of the differences between these versions](https://github.com/tc39/proposal-decorators#how-does-this-proposal-compare-to-other-versions-of-decorators).

If you specify the `decoratorsBeforeExport` option, `version` defaults to `"2018-09"`, otherwise it is a required option.

### `decoratorsBeforeExport`

This option:
- is disallowed when using `version: "legacy"`, `version: "2022-03"`, `version: "2023-01"`, `version: "2023-05"` or `version: "2023-11"`;
- is required when using `version: "2018-09"`;
- is optional and defaults to `false` when using `version: "2021-12"`.

`boolean`

```js title="JavaScript"
// decoratorsBeforeExport: false
export @decorator class Bar {}

// decoratorsBeforeExport: true
@decorator
export class Foo {}
```

This option was originally added to help tc39 collect feedback from the community by allowing experimentation with the proposed syntaxes. The proposal has now settled on allowing decorators either before or after `export`.

### `legacy`

:::danger Deprecated
Use `version: "legacy"` instead. This option is a legacy alias.
:::

`boolean`, defaults to `false`.

Use the legacy (stage 1) decorators syntax and behavior.

#### NOTE: Compatibility with `@babel/plugin-transform-class-properties`

If you are including your plugins manually and using class elements transforms such as
- `@babel/plugin-transform-class-properties`
- `@babel/plugin-transform-private-methods`
- `@babel/plugin-transform-private-property-in-object`
- `@babel/plugin-transform-class-static-block`

make sure that `@babel/plugin-proposal-decorators` comes _before_ them.

```diff title="babel.config.json"
{
  "plugins": [
-   "@babel/plugin-transform-class-properties",
    ["@babel/plugin-proposal-decorators", { "version": "2023-11" }]
+   "@babel/plugin-transform-class-properties"
  ]
}
```

If you are already using `@babel/preset-env` and Stage 3 decorators, you can safely remove the
class elements transform, Babel will automatically apply decorators transform before any presets:

```diff title="babel.config.json"
{
  "presets": [
    ["@babel/preset-env"],
  ],
  "plugins": [
-   "@babel/plugin-transform-class-properties",
    ["@babel/plugin-proposal-decorators", { "version": "2023-11" }]
  ]
}
```

If you are using `@babel/preset-env` and legacy decorators, you must ensure the class elements transform is enabled regardless of your targets, because Babel only supports compiling legacy decorators when also compiling class properties:

```diff title="babel.config.json"
{
  "presets": [
    ["@babel/preset-env", {
+     "include": [
+       "@babel/plugin-transform-class-properties"
+     ]
    }],
  ],
  "plugins": [
-   "@babel/plugin-transform-class-properties",
    ["@babel/plugin-proposal-decorators", { "version": "legacy" }]
  ]
}
```

The `include` option will enable the transforms included in `@babel/preset-env` so you can safely remove them from your `package.json`.

:::tip
You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
:::

::::

## `Symbol.metadata` notes

When using decorators which either access or modify the metadata in the decorator context, you need to use `Symbol.metadata`. When `Symbol.metadata` is not available, Babel defaults to `Symbol.for("Symbol.metadata")`: this may be incompatible with other packages that use a different fallback.

To ensure that `Symbol.metadata` is available globally and matches the symbol used by the Babel decorators plugin during transpilation, you will need to either include a polyfill that defines it, or define it yourself:

```js title="symbol-metadata-polyfill.js"
Symbol.metadata = Symbol.for("Symbol.metadata");
```

You can also use a third-party polyfill, such as `core-js/proposals/decorator-metadata-v2.js`. Make sure that the polyfill is executed before any code that uses decorators or accesses `Symbol.metadata`.

## References

- [Proposal: JavaScript Decorators](https://github.com/tc39/proposal-decorators)
