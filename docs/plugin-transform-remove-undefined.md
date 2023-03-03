---
id: babel-plugin-transform-remove-undefined
title: babel-plugin-transform-remove-undefined
sidebar_label: remove-undefined
---

For functions, this removes return arguments that evaluate to `undefined`.

## Example

**In**

```js title="JavaScript"
let a = void 0;
function foo() {
  var b = undefined;
  return undefined;
}
```

**Out**

```js title="JavaScript"
let a;
function foo() {
  var b;
  return;
}
```

## Installation

```shell npm2yarn
npm install babel-plugin-transform-remove-undefined --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["babel-plugin-transform-remove-undefined"]
}
```

### Via CLI

```shell title="Shell"
babel --plugins babel-plugin-transform-remove-undefined script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["babel-plugin-transform-remove-undefined"],
});
```

## Options

- `tdz` - Detect usages before declaration/initialization in let/const(throws) and var(void 0)

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
