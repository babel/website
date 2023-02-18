---
id: babel-plugin-transform-block-scoped-functions
title: "@babel/plugin-transform-block-scoped-functions"
sidebar_label: block-scoped-functions
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Examples

**In**

```js title="JavaScript"
{
  function name(n) {
    return n;
  }
}

name("Steve");
```

**Out**

```js title="JavaScript"
{
  let name = function(n) {
    return n;
  };
}
name("Steve");
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-block-scoped-functions
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-block-scoped-functions"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-block-scoped-functions script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-block-scoped-functions"],
});
```
