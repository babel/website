---
id: babel-preset-es2016
title: @babel/preset-es2016
sidebar_label: es2016
---

> As of Babel v6, all the yearly presets have been deprecated.
> We recommend using [`@babel/preset-env`](preset-env.md) instead.

## Install

```sh
npm install --save-dev @babel/preset-es2016
```

## Usage

### With a configuration file (Recommended)

```json
{
  "presets": ["@babel/preset-es2016"]
}
```

### Via CLI

```sh
babel script.js --presets @babel/preset-es2016
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  presets: ["@babel/preset-es2016"]
});
```

