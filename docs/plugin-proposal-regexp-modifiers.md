---
id: babel-plugin-proposal-regexp-modifiers
title: "@babel/plugin-proposal-regexp-modifiers"
sidebar_label: regexp-modifiers
---

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
You can also apply multiple modifiers:

```js
// matches Aa, aa, A\naa, etc. but not A\na
const regex = /(?im:^a)a/
```

This proposal only supports `i`, `m` and `s` as inline modifiers.

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-regexp-modifiers
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-proposal-regexp-modifiers"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/@babel/plugin-proposal-regexp-modifiers script.js
```

### Via Node.js API

```js title="JavaScript"
require("@babel/core").transformSync(code, {
  plugins: ["@babel/plugin-proposal-regexp-modifiers"],
});
```

## References

- [Proposal: Regular Expression Pattern Modifiers for ECMAScript](https://github.com/tc39/proposal-regexp-modifiers)
