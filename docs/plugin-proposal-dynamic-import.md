---
id: babel-plugin-proposal-dynamic-import
title: "@babel/plugin-proposal-dynamic-import"
sidebar_label: dynamic-import
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> **NOTE**: This plugin is included in `@babel/preset-env`, in [ES2020](https://github.com/tc39/proposals/blob/master/finished-proposals.md).

Transforms `import()` expressions to non-ESM module formats.

## When (not) to use this plugin

If you are using a bundler, such as Webpack, Rollup or Parcel, you should **not** use this plugin and let your bundler handle `import()` expressions.

You should use this plugin if:
- You are authoring a Node.js library in ESM but want to distribute it in CommonJS(CJS): Install this plugin and [`@babel/plugin-transform-modules-commonjs`](./plugin-transform-modules-commonjs.md)
- You use [RequireJS](https://requirejs.org) to load modules in the browser: Install this plugin and [`@babel/plugin-transform-modules-amd`](./plugin-transform-modules-amd.md)
- You use [SystemJS](https://github.com/systemjs/systemjs) to load modules in the browser: Install this plugin and [`@babel/plugin-transform-modules-systemjs`](./plugin-transform-modules-systemjs.md)

This plugin must be used with one of the module transform plugins mentioned above.

## Example
```js title="input.js"
import("jquery").then($ => {});
```

will be transformed to

<Tabs>
  <TabItem value="commonjs" label="CommonJS" default>

  ```js title="output.js"
  Promise.resolve()
    .then(() => _interopRequireWildcard(require("jquery")))
    .then(($) => {});
  ```
  </TabItem>
  <TabItem value="amd" label="AMD">

  ```js title="output.js"
  define(["require"], function (_require) {
    new Promise((_resolve, _reject) =>
      _require(
        ["jquery"],
        (imported) => _resolve(_interopRequireWildcard(imported)),
        _reject
      )
    ).then(($) => {});
  });
  ```
  </TabItem>
  <TabItem value="systemjs" label="SystemJS">

  ```js title="output.js"
  System.register([], function (_export, _context) {
    "use strict";

    return {
      setters: [],
      execute: function () {
        _context.import("jquery").then(($) => {});
      }
    };
  });
  ```
  </TabItem>
</Tabs>

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-dynamic-import
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": [
    "@babel/plugin-proposal-dynamic-import",
    "@babel/plugin-transform-modules-commonjs"
  ]
}
```

### Via CLI

```sh title="Shell"
babel --plugins=@babel/plugin-proposal-dynamic-import,@babel/plugin-transform-modules-amd script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: [
    "@babel/plugin-proposal-dynamic-import",
    "@babel/plugin-transform-modules-systemjs"
  ],
});
```

## References

- [Proposal: import()](https://github.com/tc39/proposal-dynamic-import)
