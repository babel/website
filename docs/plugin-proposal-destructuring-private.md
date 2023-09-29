---
id: babel-plugin-proposal-destructuring-private
title: "@babel/plugin-proposal-destructuring-private"
sidebar_label: destructuring-private
---

Transforms private destructuring `var { #y: y } = this` to `var y = this.#y`.

## Example
```js title="JavaScript"
class Foo {
  x;
  #y;
  equalsTo({ x, #y: y }) {
    return this.x === x && this.#y === y;
  }
}
```

will be transformed to

```js title="JavaScript"
class Foo {
  x;
  #y;
  equalsTo(_p) {
    var { x } = _p, y = _p.#y;
    return this.x === x && this.#y === y;
  }
}
```

The plugin respects these compiler assumptions:
- [`ignoreFunctionLength`](assumptions.md#ignorefunctionlength)
- [`objectRestNoSymbols`](assumptions.md#objectrestnosymbols)

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-destructuring-private
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-proposal-destructuring-private"]
}
```

Because the output code includes private fields, if you are already using other class feature plugins (e.g. [`@babel/plugin-transform-class-properties](plugin-transform-class-properties.md)), be sure to place it _before_ the others.

```json title="babel.config.json"
{
  "plugins": [
    "@babel/plugin-proposal-destructuring-private",
    "@babel/plugin-transform-class-properties"
  ]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-proposal-destructuring-private script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-destructuring-private"],
});
```

## References

- [Proposal: Destructuring Private](https://github.com/tc39/proposal-destructuring-private)
