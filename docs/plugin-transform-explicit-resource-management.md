---
id: babel-plugin-transform-explicit-resource-management
title: "@babel/plugin-transform-explicit-resource-management"
sidebar_label: explicit-resource-management
---

:::info
This plugin is included in `@babel/preset-env`, in [ES2026](https://github.com/tc39/proposals/blob/master/finished-proposals.md).
:::

This plugin enables Babel to transform using declarations `using handler = await read();`.

## Example

```js title="input.js"
using handlerSync = openSync();
await using handlerAsync = await openAsync();
```

will be transformed to

```js title="output.js"
try {
  var _usingCtx = babelHelpers.usingCtx();
  var handlerSync = _usingCtx.u(openSync());
  var handlerAsync = _usingCtx.a(await openAsync());
} catch (_) {
  _usingCtx.e = _;
} finally {
  await _usingCtx.d();
}
```

[Try it on the REPL](https://babeljs.io/repl#?browsers=chrome%2047&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=K4Zwlgdg5gBAFgQwgEwDYFMBOBlAnhAYxgF4YB7AB3Qj0IAoBKAbgCgEB3BMAFxlEliIUGTAEEQ-IqQ5delauMmMmQA&forceAllTransforms=false&modules=false&shippedProposals=false&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env&prettier=false&targets=&version=7.27.3&externalPlugins=%40babel%2Fplugin-proposal-explicit-resource-management%407.27.3%2C%40babel%2Fplugin-external-helpers%407.27.1&assumptions=%7B%7D).

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-explicit-resource-management
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-explicit-resource-management"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-explicit-resource-management script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-explicit-resource-management"]
});
```

## References

- [Proposal: ECMAScript Explicit Resource Management](https://github.com/tc39/transform-explicit-resource-management)
