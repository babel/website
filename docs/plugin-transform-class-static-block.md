---
id: babel-plugin-transform-class-static-block
title: "@babel/plugin-transform-class-static-block"
sidebar_label: class-static-block
---

:::info
This plugin is included in `@babel/preset-env`, in [ES2022](https://github.com/tc39/proposals/blob/master/finished-proposals.md)
:::

A class with a static block will be transformed into a static private property, whose initializer is the static block wrapped in an IIAFE (immediate invoked arrow function expression).

## Example

```js title="JavaScript"
class C {
  static #x = 42;
  static y;
  static {
    try {
      this.y = doSomethingWith(this.#x);
    } catch {
      this.y = "unknown";
    }
  }
}
```

will be transformed to

```js title="JavaScript"
class C {
  static #x = 42;
  static y;
  static #_ = (() => {
    try {
      this.y = doSomethingWith(this.#x);
    } catch {
      this.y = "unknown";
    }
  })();
}
```

Because the output code includes private class properties, if you are already using other class feature plugins (e.g. [`@babel/plugin-transform-class-properties](plugin-transform-class-properties.md)), be sure to place it _before_ the others.

```json title="babel.config.json"
{
  "plugins": [
    "@babel/plugin-transform-class-static-block",
    "@babel/plugin-transform-class-properties"
  ]
}
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-class-static-block
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-class-static-block"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-class-static-block script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-class-static-block"],
});
```

## References

- [Proposal: Class Static Block](https://github.com/tc39/proposal-class-static-block)
