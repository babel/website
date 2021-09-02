---
id: babel-plugin-proposal-nullish-coalescing-operator
title: @babel/plugin-proposal-nullish-coalescing-operator
sidebar_label: nullish-coalescing-operator
---

> **NOTE**: This plugin is included in `@babel/preset-env`, in [ES2020](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

## Example

**In**

```javascript
var foo = object.foo ?? "default";
```

**Out**

```javascript
var _object$foo;

var foo =
  (_object$foo = object.foo) !== null && _object$foo !== void 0
    ? _object$foo
    : "default";
```

> **NOTE:** We cannot use `!= null` here because `document.all == null` and
> `document.all` has been deemed not "nullish".

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-nullish-coalescing-operator
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-proposal-nullish-coalescing-operator"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-nullish-coalescing-operator script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-nullish-coalescing-operator"],
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

When `true`, this transform will pretend `document.all` does not exist,
and perform loose equality checks with `null` instead of strict equality checks
against both `null` and `undefined`.

> ⚠️ Consider migrating to the top level [`noDocumentAll`](assumptions.md#nodocumentall) assumption.

```jsonc
// babel.config.json
{
  "assumptions": {
    "noDocumentAll": true
  }
}
```

#### Example

**In**

```javascript
var foo = object.foo ?? "default";
```

**Out**

```javascript
var _object$foo;

var foo = (_object$foo = object.foo) != null ? _object$foo : "default";
```

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)

## References

- [Proposal: Nullish Coalescing](https://github.com/tc39-transfer/proposal-nullish-coalescing)
