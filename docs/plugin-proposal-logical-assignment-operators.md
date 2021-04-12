---
id: babel-plugin-proposal-logical-assignment-operators
title: @babel/plugin-proposal-logical-assignment-operators
sidebar_label: proposal-logical-assignment-operators
---

## Example

**In**

```javascript
a ||= b;
obj.a.b ||= c;

a &&= b;
obj.a.b &&= c;
```

**Out**

```javascript
var _obj$a, _obj$a2, _a, _obj$a3, _b;

a || (a = b);
(_obj$a = obj.a).b || (_obj$a.b = c);

a && (a = b);
(_obj$a2 = obj.a).b && (_obj$a2.b = c);
```

### With Nullish Coalescing

> While using the `@babel/plugin-proposal-nullish-coalescing-operator` plugin (included in `@babel/preset-env`)

```javascript
a ??= b;
obj.a.b ??= c;
```

```javascript
(_a = a) !== null && _a !== void 0 ? _a : a = b;
(_b = (_obj$a = obj.a).b) !== null && _b !== void 0 ? _b : _obj$a.b = c;
```

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-logical-assignment-operators
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-proposal-logical-assignment-operators"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-logical-assignment-operators script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-proposal-logical-assignment-operators"]
});
```

## References

* [Proposal: Logical Assignment Operators](https://github.com/tc39/proposal-logical-assignment)

