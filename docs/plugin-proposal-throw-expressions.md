---
id: babel-plugin-proposal-throw-expressions
title: @babel/plugin-proposal-throw-expressions
sidebar_label: throw-expressions
---

## Example

```js
function test(param = throw new Error("required!")) {
  const test = param === true || throw new Error("Falsy!");
}
```

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-throw-expressions
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-proposal-throw-expressions"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-throw-expressions script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-throw-expressions"],
});
```

## References

- [Proposal: ECMAScript throw expressions](https://github.com/tc39/proposal-throw-expressions)
