---
id: babel-plugin-transform-regexp-modifiers
title: "@babel/plugin-transform-regexp-modifiers"
sidebar_label: regexp-modifiers
---

:::info
This plugin is included in `@babel/preset-env`, in [ES2025](https://github.com/tc39/proposals/blob/master/finished-proposals.md).
:::

## Example

### `i` modifier
```js title="input.js"
// matches Aa and aa
const regex = /(?i:a)a/
```
will be transformed to
```js title="output.js"
const regex = /(?:[Aa])a/
```

### `m` modifier
```js title="input.js"
// matches aa, a\naa, etc. but not a\na
const regex = /(?m:^a)a/
```
will be transformed to
```js title="output.js"
const regex = /(?:(?:^|(?<=[\n\r\u2028\u2029]))a)a/
```

### `s` modifier
```js title="input.js"
// matches \na and aa, but not \n\n
const regex = /(?s:.)./
```
will be transformed to
```js title="output.js"
const regex = /(?:[\s\S])./;
```

### Multiple modifiers
You can also enable multiple modifiers:

```js
// matches Aa, aa, A\naa, etc. but not A\na
const regex = /(?im:^a)a/
```

or disable them:

```js
// matches Aa, aa, A\naa, etc. but not A\na
const regex = /^a(?-im:a)/im
```

This proposal only supports `i`, `m` and `s` as inline modifiers.

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-regexp-modifiers
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-regexp-modifiers"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/@babel/plugin-transform-regexp-modifiers script.js
```

### Via Node.js API

```js title="JavaScript"
require("@babel/core").transformSync(code, {
  plugins: ["@babel/plugin-transform-regexp-modifiers"],
});
```

## References

- [Proposal: Regular Expression Pattern Modifiers for ECMAScript](https://github.com/tc39/transform-regexp-modifiers)
