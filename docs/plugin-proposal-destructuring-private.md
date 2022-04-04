---
id: babel-plugin-proposal-destructuring-private
title: @babel/plugin-proposal-destructuring-private
sidebar_label: destructuring-private
---

Transforms private destructuring `var { #y: y } = this` to `var y = this.#y`.

## Example
```js
class Foo {
  x;
  #y;
  equalsTo({ x, #y: y }) {
    return this.x === x && this.#y === y;
  }
}
```

will be transformed to

```js
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

```sh
npm install --save-dev @babel/plugin-proposal-destructuring-private
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-proposal-destructuring-private"]
}
```

Because the output code includes private fields, if you are already using other class feature plugins (e.g. [`@babel/plugin-proposal-class-properties](plugin-proposal-class-properties.md)), be sure to place it _before_ the others.

```json
{
  "plugins": [
    "@babel/plugin-proposal-destructuring-private",
    "@babel/plugin-proposal-class-properties"
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-destructuring-private script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-destructuring-private"],
});
```

## References

- [Proposal: Destructuring Private](https://github.com/tc39/proposal-destructuring-private)
