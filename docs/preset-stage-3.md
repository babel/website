---
id: babel-preset-stage-3
title: @babel/preset-stage-3
sidebar_label: stage-3
---

> As of Babel v7, all the stage presets have been deprecated.
> Check [the blog post](/blog/2018/07/27/removing-babels-stage-presets) for more information.
>
> For upgrade instructions, see [the README](https://github.com/babel/babel/blob/master/packages/babel-preset-stage-3/README.md).

The gist of Stage 3 is:

> **Stage 3**: candidate
>
> **What is it?** The proposal is mostly finished and now needs feedback from implementations and users to progress further.

> **What’s required?** The spec text must be complete. Designated reviewers (appointed by TC39, not by the champion) and the ECMAScript spec editor must sign off on the spec text. There must be at least two spec-compliant implementations (which don’t have to be enabled by default).
>
> **What’s next?** Henceforth, changes should only be made in response to critical issues raised by the implementations and their use.

## Install

```sh
npm install --save-dev @babel/preset-stage-3
```

## Usage

### With a configuration file (Recommended)

```json
{
  "presets": ["@babel/preset-stage-3"]
}
```

### Via CLI

```sh
babel script.js --presets @babel/preset-stage-3
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  presets: ["@babel/preset-stage-3"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

Enable "loose" transformations for any plugins in this preset that allow them.

### `useBuiltIns`

`boolean`, defaults to `false`.

Will use the native built-in instead of trying to polyfill behavior for any plugins that require one.

> You can read more about configuring preset options [here](https://babeljs.io/docs/en/presets#preset-options)

## References

- Chapter "[The TC39 process for ECMAScript features](http://exploringjs.com/es2016-es2017/ch_tc39-process.html)" in "Exploring ES2016 and ES2017" by Axel Rauschmayer

