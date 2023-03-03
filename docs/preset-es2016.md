---
id: babel-preset-es2016
title: "@babel/preset-es2016"
sidebar_label: es2016
---

> As of Babel v6, all the yearly presets have been deprecated.
> We recommend using [`@babel/preset-env`](preset-env.md) instead.

## Install

```shell npm2yarn
npm install --save-dev @babel/preset-es2016
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "presets": ["@babel/preset-es2016"]
}
```

### Via CLI

```sh title="Shell"
babel script.js --presets @babel/preset-es2016
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  presets: ["@babel/preset-es2016"]
});
```

