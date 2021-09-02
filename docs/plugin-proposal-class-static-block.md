---
id: babel-plugin-proposal-class-static-block
title: @babel/plugin-proposal-class-static-block
sidebar_label: class-static-block
---

> **NOTE**: This plugin is included in `@babel/preset-env`, in [ES2022](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

A class with a static block will be transformed into a static private property, whose initializer is the static block wrapped in an IIAFE (immediate invoked arrow function expression).

## Example

```js
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

```js
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

Because the output code includes private class properties, if you are already using other class feature plugins (e.g. [`@babel/plugin-proposal-class-properties](plugin-proposal-class-properties.md)), be sure to place it _before_ the others.

```json
{
  "plugins": [
    "@babel/plugin-proposal-class-static-block",
    "@babel/plugin-proposal-class-properties"
  ]
}
```

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-class-static-block
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-proposal-class-static-block"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-class-static-block script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-class-static-block"],
});
```

## References

- [Proposal: Class Static Block](https://github.com/tc39/proposal-class-static-block)
