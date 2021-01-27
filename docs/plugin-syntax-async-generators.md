---
id: babel-plugin-syntax-async-generators
title: @babel/plugin-syntax-async-generators
sidebar_label: syntax-async-generators
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-async-generators](plugin-proposal-async-generator-functions.md) to _both_ parse and transform this syntax.

## Example

**Syntax**

```javascript
async function* agf() {
  await 1;
}
```

```js
async function f() {
  for await (let x of y) {
    g(x);
  }
}
```

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-async-generators
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-async-generators"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-async-generators script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-async-generators"]
});
```

## References

* [Proposal: Asynchronous iteration for ECMAScript](https://github.com/tc39/proposal-async-iteration)

