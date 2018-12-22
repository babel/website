---
id: version-7.0.0-babel-preset-stage-0
title: @babel/preset-stage-0
sidebar_label: stage-0
original_id: babel-preset-stage-0
---

> As of Babel v7, all the stage presets have been deprecated.
> Check [the blog post](/blog/2018/07/27/removing-babels-stage-presets) for more information.
>
> For upgrade instructions, see [the README](https://github.com/babel/babel/blob/master/packages/babel-preset-stage-0/README.md).

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
  presets: ["@babel/preset-stage-0"]
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


