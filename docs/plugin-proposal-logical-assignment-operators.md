---
id: babel-plugin-proposal-logical-assignment-operators
title: "@babel/plugin-proposal-logical-assignment-operators"
sidebar_label: logical-assignment-operators
---

> **NOTE**: This plugin is included in `@babel/preset-env`, in [ES2021](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

## Example

**In**

```js title="JavaScript"
a ||= b;
obj.a.b ||= c;

a &&= b;
obj.a.b &&= c;
```

**Out**

```js title="JavaScript"
var _obj$a, _obj$a2;

a || (a = b);
(_obj$a = obj.a).b || (_obj$a.b = c);

a && (a = b);
(_obj$a2 = obj.a).b && (_obj$a2.b = c);
```

### With Nullish Coalescing

> While using the `@babel/plugin-proposal-nullish-coalescing-operator` plugin (included in `@babel/preset-env`)

```js title="JavaScript"
a ??= b;
obj.a.b ??= c;
```

```js title="JavaScript"
var _a, _obj$a, _obj$a$b;

(_a = a) !== null && _a !== void 0 ? _a : (a = b);
(_obj$a$b = (_obj$a = obj.a).b) !== null && _obj$a$b !== void 0
  ? _obj$a$b
  : (_obj$a.b = c);
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-logical-assignment-operators
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-proposal-logical-assignment-operators"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-proposal-logical-assignment-operators script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-logical-assignment-operators"],
});
```

## References

- [Proposal: Logical Assignment Operators](https://github.com/tc39/proposal-logical-assignment)
