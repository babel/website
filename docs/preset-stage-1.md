---
id: babel-preset-stage-1
title: @babel/preset-stage-1
sidebar_label: stage-1
---

> As of Babel v7, all the stage presets have been deprecated.
> Check [the blog post](/blog/2018/07/27/removing-babels-stage-presets) for more information.
>
> For upgrade instructions, see [the README](https://github.com/babel/babel/blob/master/packages/babel-preset-stage-1/README.md).

The gist of Stage 1 is:

> **Stage 1**: proposal
>
> **What is it?** A formal proposal for the feature.
>
> **What’s required?** A so-called champion must be identified who is responsible for the proposal. Either the champion or a co-champion must be a member of TC39 (source). The problem solved by the proposal must be described in prose. The solution must be described via examples, an API and a discussion of semantics and algorithms. Lastly, potential obstacles for the proposal must be identified, such as interactions with other features and implementation challenges. Implementation-wise, polyfills and demos are needed.
>
> **What’s next?** By accepting a proposal for stage 1, TC39 declares its willingness to examine, discuss and contribute to the proposal. Going forward, major changes to the proposal are expected

## Install

```sh
npm install --save-dev @babel/preset-stage-1
```

## Usage

### With a configuration file (Recommended)

```json
{
  "presets": ["@babel/preset-stage-1"]
}
```

### Via CLI

```sh
babel script.js --presets @babel/preset-stage-1
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  presets: ["@babel/preset-stage-1"]
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

