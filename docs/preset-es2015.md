---
id: babel-preset-es2015
title: @babel/preset-es2015
sidebar_label: es2015
---

> As of Babel v6, all the yearly presets have been deprecated.
> We recommend using [`@babel/preset-env`](preset-env.md) instead.

## Install

```sh
npm install --save-dev @babel/preset-es2015
```

## Usage

### With a configuration file (Recommended)

```json
{
  "presets": ["@babel/preset-es2015"]
}
```

### Via CLI

```sh
babel script.js --presets @babel/preset-es2015
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  presets: ["@babel/preset-es2015"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

Enable "loose" transformations for any plugins in this preset that allow them.

### `modules`

`"amd" | "umd" | "systemjs" | "commonjs" | "cjs" | false`, defaults to `"commonjs"`.

Enable transformation of ES6 module syntax to another module type.

Setting this to `false` will not transform modules.

### `spec`

`boolean`, defaults to `false`.

Enable "spec" transformations for any plugins in this preset that allow them.

> You can read more about configuring preset options [here](https://babeljs.io/docs/en/presets#preset-options)
