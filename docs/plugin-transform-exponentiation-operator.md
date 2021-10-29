---
id: babel-plugin-transform-exponentiation-operator
title: @babel/plugin-transform-exponentiation-operator
sidebar_label: exponentiation-operator
---

> **NOTE**: This plugin is included in `@babel/preset-env`, in [ES2016](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

## Example

**In**

```javascript
let x = 10 ** 2;

x **= 3;
```

**Out**

```javascript
let x = Math.pow(10, 2);

x = Math.pow(x, 3);
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-exponentiation-operator
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-exponentiation-operator"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-exponentiation-operator script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-exponentiation-operator"],
});
```

## References

- [Spec: Exponentiation Operator](https://tc39.github.io/ecma262/#sec-exp-operator)
- [Proposal: Exponentiation Operator](https://github.com/rwaldron/exponentiation-operator)
