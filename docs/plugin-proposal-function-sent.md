---
id: babel-plugin-proposal-function-sent
title: "@babel/plugin-proposal-function-sent"
sidebar_label: function-sent
---

## Example

```js title="JavaScript"
function* generator() {
  console.log("Sent", function.sent);
  console.log("Yield", yield);
}

const iterator = generator();
iterator.next(1); // Logs "Sent 1"
iterator.next(2); // Logs "Yield 2"
```

Is compiled roughly to

```js title="JavaScript"
let generator = _skipFirstGeneratorNext(function*() {
  const _functionSent = yield;
  console.log("Sent", _functionSent);
  console.log("Yield", yield);
});

const iterator = generator();
iterator.next(1); // Logs "Sent 1"
iterator.next(2); // Logs "Yield 2"
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-function-sent
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-proposal-function-sent"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-proposal-function-sent script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-function-sent"],
});
```

## References

- [Proposal](https://github.com/allenwb/ESideas/blob/master/Generator%20metaproperty.md)
