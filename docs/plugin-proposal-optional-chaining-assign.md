---
id: babel-plugin-proposal-optional-chaining-assign
title: "@babel/plugin-proposal-optional-chaining-assign"
sidebar_label: optional-chaining
---

Transform optional chaining on the left-hand side of assignment expressions.

## Example
```js title="input.js"
function doSomething(maybeOptions) {
  maybeOptions?.retries = 5;
}
```

will be transformed to

```js title="output.js"
function doSomething(maybeOptions) {
  maybeOptions !== null && maybeOptions !== void 0 && maybeOptions.retries = 5;
}
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-optional-chaining-assign
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-proposal-optional-chaining-assign"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-proposal-optional-chaining-assign script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-optional-chaining-assign"],
});
```

## Options

### Assumptions

This plugin is affected by the [`noDocumentAll`](https://babeljs.io/docs/assumptions#nodocumentall) assumption.

## References

- [Proposal: Optional Chaining Assignment](https://github.com/tc39/proposal-optional-chaining-assignment)
