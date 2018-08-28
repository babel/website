---
id: babel-plugin-proposal-optional-catch-binding
title: @babel/plugin-proposal-optional-catch-binding
sidebar_label: proposal-optional-catch-binding
---


## Examples

```js
try {
  throw 0;
} catch {
  doSomethingWhichDoesntCareAboutTheValueThrown();
}
```

```js
try {
  throw 0;
} catch {
  doSomethingWhichDoesntCareAboutTheValueThrown();
} finally {
  doSomeCleanup();
}
```


## Installation

```sh
npm install --save-dev @babel/plugin-proposal-optional-catch-binding
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

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
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-proposal-optional-catch-binding"]
});
```

## References
- [Proposal: Optional Catch Binding for ECMAScript](https://github.com/babel/proposals/issues/7)

