---
id: babel-plugin-transform-instanceof
title: @babel/plugin-transform-instanceof
sidebar_label: instanceof
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Example

**In**

```javascript
foo instanceof Bar;
```

**Out**

```javascript
function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

_instanceof(foo, Bar);
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-instanceof
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-instanceof"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-instanceof script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-instanceof"],
});
```

## References

- [ES6 Spec: InstanceOf Operator Semantics](https://www.ecma-international.org/ecma-262/6.0/#sec-instanceofoperator)
- [MDN: Symbol.hasInstance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance)
