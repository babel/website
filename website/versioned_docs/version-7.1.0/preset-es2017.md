---
id: version-7.1.0-babel-preset-es2017
title: @babel/preset-es2017
sidebar_label: es2017
original_id: babel-preset-es2017
---

> As of Babel v6, all the yearly presets have been deprecated.
> We recommend using [`@babel/preset-env`](preset-env.md) instead.

## Install

```sh
npm install --save-dev @babel/preset-es2017
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["@babel/preset-es2017"]
}
```

### Via CLI

```sh
babel script.js --presets @babel/preset-es2017
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  presets: ["@babel/preset-es2017"]
});
```

