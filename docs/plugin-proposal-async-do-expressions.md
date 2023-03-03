---
id: babel-plugin-proposal-async-do-expressions
title: "@babel/plugin-proposal-async-do-expressions"
sidebar_label: async-do-expressions
---

> The `async do { .. }` expression executes a block (with one or many statements in it) in an _asynchronous_ context, and the final statement completion value inside the block becomes the completion value of the _asynchronous_ code.

## Example

Issuing HTTP request in parallel

```js title="JavaScript"
Promise.all([
  async do {
    const result = await fetch('https://example.com/A');
    await result.json()
  },
  async do {
    const result = await fetch('https://example.org/B');
    await result.json()
  },
]).then(([a, b]) => {
  console.log("example.com/A", a);
  console.log("example.org/B", b);
})
```

will be transformed to

```js title="JavaScript"
Promise.all([
  (async () {
    const result = await fetch('https://example.com/A');
    return await result.json()
  })(),
  (async () {
    const result = await fetch('https://example.org/B');
    return await result.json()
  })(),
]).then(([a, b]) => {
  console.log("example.com/A", a);
  console.log("example.org/B", b);
})
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-async-do-expressions
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-proposal-async-do-expressions"]
}
```

Note: This plugin transpiles `async do {}` to ES2017 Async arrow function `async () => {}`. If you target to an older engine, i.e. Node.js 6 or IE 11, please also add [`@babel/plugin-transform-async-to-generator`](plugin-transform-async-to-generator.md):

```json title="babel.config.json"
{
  "plugins": [
    "@babel/plugin-proposal-async-do-expressions",
    "@babel/plugin-transform-async-to-generator"
  ]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-proposal-async-do-expressions script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-async-do-expressions"],
});
```

## References

- [Proposal: `async do` expressions](https://github.com/tc39/proposal-async-do-expressions)
