---
id: babel-plugin-proposal-decorators
title: @babel/plugin-proposal-decorators
sidebar_label: decorators
---

## Example

(examples are from proposal)

### Simple class decorator

```js
@annotation
class MyClass {}

function annotation(target) {
  target.annotated = true;
}
```

### Class decorator

```js
@isTestable(true)
class MyClass {}

function isTestable(value) {
  return function decorator(target) {
    target.isTestable = value;
  };
}
```

### Class function decorator

```js
class C {
  @enumerable(false)
  method() {}
}

function enumerable(value) {
  return function(target, key, descriptor) {
    descriptor.enumerable = value;
    return descriptor;
  };
}
```

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-decorators
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-proposal-decorators"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-decorators script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-decorators"],
});
```

## Options

### `decoratorsBeforeExport`

`boolean`

<details>
  <summary>History</summary>
| Version | Changes |
| --- | --- |
| `v7.2.0` | `decoratorsBeforeExport` must be specified. Before that it defaults to `false` |
</details>

```js
// decoratorsBeforeExport: false
export @decorator class Bar {}

// decoratorsBeforeExport: true
@decorator
export class Foo {}
```

This option was added to help tc39 collect feedback from the community by allowing experimentation with both possible syntaxes.

For more information, check out: [tc39/proposal-decorators#69](https://github.com/tc39/proposal-decorators/issues/69).

### `legacy`

`boolean`, defaults to `false`.

Use the legacy (stage 1) decorators syntax and behavior.

#### NOTE: Compatibility with `@babel/plugin-proposal-class-properties`

If you are including your plugins manually and using `@babel/plugin-proposal-class-properties`, make sure that `@babel/plugin-proposal-decorators` comes _before_ `@babel/plugin-proposal-class-properties`.

When using the `legacy: true` mode, the [`setPublicClassFields` assumption](assumptions.md#setpublicclassfields) must be enabled to support the `@babel/plugin-proposal-decorators`.

Wrong:

```json
{
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-decorators"
  ]
}
```

Right:

```json
{
  "plugins": [
    "@babel/plugin-proposal-decorators",
    "@babel/plugin-proposal-class-properties"
  ]
}
```

```json
{
  "assumptions": {
    "setPublicClassFields": true
  },
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties"]
  ]
}
```

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)

## References

- [Proposal: JavaScript Decorators](https://github.com/wycats/javascript-decorators/blob/master/README.md)
