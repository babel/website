---
id: babel-plugin-proposal-explicit-resource-management
title: "@babel/plugin-proposal-explicit-resource-management"
sidebar_label: explicit-resource-management
---

This plugin enables Babel to transform using declarations `using handler = await read();`.

## Example

```js title="input.js"
using handlerSync = openSync();
await using handlerAsync = await openAsync();
```

will be transformed to

```js title="output.js"
try {
  var _stack = [];
  var handlerSync = babelHelpers.using(_stack, openSync());
  var handlerAsync = babelHelpers.using(_stack, await openAsync(), true);
} catch (_) {
  var _error = _;
  var _hasError = true;
} finally {
  await babelHelpers.dispose(_stack, _error, _hasError);
}
```

[Try it on the REPL](https://babeljs.io/repl#?build=&builtIns=false&corejs=3.28&spec=false&loose=false&code_lz=K4Zwlgdg5gBAFgQwgEwDYFMBOBlAnhAYxgF4YB7AB3Qj0IAoBKAbgCgEB3BMAFxlEliIUGTAEEQ-IqQ5delauMmMmQA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&externalPlugins=%40babel%2Fplugin-proposal-explicit-resource-management%407.22.0%2C%40babel%2Fplugin-external-helpers%407.18.6&assumptions=%7B%7D).

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-explicit-resource-management
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-proposal-explicit-resource-management"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-proposal-explicit-resource-management script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-explicit-resource-management"]
});
```

## References

- [Proposal: ECMAScript Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management)
