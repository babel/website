---
id: babel-plugin-proposal-optional-catch-binding
title: @babel/plugin-proposal-optional-catch-binding
sidebar_label: optional-catch-binding
---

> **NOTE**: This plugin is included in `@babel/preset-env`, in [ES2019](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

## Examples

```js
try {
  throw 0;
} catch {
  doSomethingWhichDoesNotCareAboutTheValueThrown();
}
```

```js
try {
  throw 0;
} catch {
  doSomethingWhichDoesNotCareAboutTheValueThrown();
} finally {
  doSomeCleanup();
}
```

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-optional-catch-binding
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-proposal-optional-catch-binding"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-optional-catch-binding script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-optional-catch-binding"],
});
```

## References

- [Proposal: Optional Catch Binding for ECMAScript](https://github.com/babel/proposals/issues/7)
