---
id: version-7.0.0-babel-preset-stage-2
title: @babel/preset-stage-2
sidebar_label: stage-2
original_id: babel-preset-stage-2
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

The gist of Stage 2 is:

> **Stage 2:** draft
>
> **What is it?** A first version of what will be in the specification. At this point, an eventual inclusion of the feature in the standard is likely.
>
> **What’s required?** The proposal must now additionally have a formal description of the syntax and semantics of the feature (using the formal language of the ECMAScript specification). The description should be as complete as possible, but can contain todos and placeholders. Two experimental implementations of the feature are needed, but one of them can be in a transpiler such as Babel.
>
> **What’s next?** Only incremental changes are expected from now on.

## Install

```sh
npm install --save-dev @babel/preset-stage-2
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["@babel/preset-stage-2"]
}
```

### Via CLI

```sh
babel script.js --presets @babel/preset-stage-2
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  presets: ["@babel/preset-stage-2"],
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

## References

- Chapter "[The TC39 process for ECMAScript features](http://exploringjs.com/es2016-es2017/ch_tc39-process.html)" in "Exploring ES2016 and ES2017" by Axel Rauschmayer
