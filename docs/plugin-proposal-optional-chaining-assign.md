---
id: babel-plugin-proposal-optional-chaining-assign
title: "@babel/plugin-proposal-optional-chaining-assign"
sidebar_label: optional-chaining-assign
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
  "plugins": [
    "@babel/plugin-proposal-optional-chaining-assign",
    {
      "version": "2023-07"
    }
  ]
}
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: [["@babel/plugin-proposal-optional-chaining-assign", {
      "version": "2023-07"
    }]],
});
```

## Options

### Assumptions

This plugin is affected by the [`noDocumentAll`](https://babeljs.io/docs/assumptions#nodocumentall) assumption.

### `version`

Required.

`"2023-07"`

Selects the proposal to use:

- `"2023-07"`: The stage 1 proposal as defined at [`tc39/proposal-optional-chaining-assignment@49d055c44b`](https://github.com/tc39/proposal-optional-chaining-assignment/commit/e7b48795b66a8196b1abcab2e52e2049d055c44b), presented in the July 2023 TC39 meeting.

## References

- [Proposal: Optional Chaining Assignment](https://github.com/tc39/proposal-optional-chaining-assignment)
