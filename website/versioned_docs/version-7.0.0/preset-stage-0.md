---
id: version-7.0.0-babel-preset-stage-0
title: @babel/preset-stage-0
sidebar_label: stage-0
original_id: babel-preset-stage-0
---

> As of Babel v7, all of the stage-x presets have been deprecated.
> Check [the blog post](/blog/2018/07/27/removing-babels-stage-presets) for more information.
>
> For a more automatic migration, we have updated [babel-upgrade](https://github.com/babel/babel-upgrade) to do this for you (you can run `npx babel-upgrade`).
>
> If you want the same configuration as before:
>
> ```json5
> {
>   plugins: [
>     // Stage 0
>     "@babel/plugin-proposal-function-bind",
>
>     // Stage 1
>     "@babel/plugin-proposal-export-default-from",
>     "@babel/plugin-proposal-logical-assignment-operators",
>     ["@babel/plugin-proposal-optional-chaining", { loose: false }],
>     ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
>     ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }],
>     "@babel/plugin-proposal-do-expressions",
>
>     // Stage 2
>     ["@babel/plugin-proposal-decorators", { legacy: true }],
>     "@babel/plugin-proposal-function-sent",
>     "@babel/plugin-proposal-export-namespace-from",
>     "@babel/plugin-proposal-numeric-separator",
>     "@babel/plugin-proposal-throw-expressions",
>
>     // Stage 3
>     "@babel/plugin-syntax-dynamic-import",
>     "@babel/plugin-syntax-import-meta",
>     ["@babel/plugin-proposal-class-properties", { loose: false }],
>     "@babel/plugin-proposal-json-strings",
>   ],
> }
> ```
>
> If you're using the same configuration across many separate projects, keep in mind that you can also create your own custom presets with whichever plugins and presets you're looking to use.
>
> ```js
> module.exports = function() {
>   return {
>     plugins: [
>       require("@babel/plugin-syntax-dynamic-import"),
>       [require("@babel/plugin-proposal-decorators"), { legacy: true }],
>       [require("@babel/plugin-proposal-class-properties"), { loose: false }],
>     ],
>     presets: [
>       // ...
>     ],
>   };
> };
> ```

## Install

```sh
npm install --save-dev @babel/preset-stage-0
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["@babel/preset-stage-0"]
}
```

### Via CLI

```sh
babel script.js --presets @babel/preset-stage-0
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  presets: ["@babel/preset-stage-0"],
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

Enable "loose" transformations for any plugins in this preset that allow them.

### `useBuiltIns`

`boolean`, defaults to `false`.

Will use the native built-in instead of trying to polyfill behavior for any plugins that require one.

### `decoratorsLegacy`

`boolean`, defaults to `false`.

Use the legacy (stage 1) decorators syntax and behavior.
