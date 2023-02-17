---
id: babel-plugin-minify-builtins
title: babel-plugin-minify-builtins
sidebar_label: minify-builtins
---

## Example

**In**

```js title="JavaScript"
Math.floor(a) + Math.floor(b)
```

**Out**

```js title="JavaScript"
var _Mathfloor = Math.floor;

_Mathfloor(a) + _Mathfloor(b);
```

## Installation

```shell npm2yarn
npm install babel-plugin-minify-builtins --save-dev
```

## Usage

### With a configuration file (Recommended)


```json title="babel.config.json"
{
  "plugins": ["minify-builtins"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins minify-builtins script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["minify-builtins"]
});
```

## Options

+ `tdz` - Account for TDZ (Temporal Dead Zone)

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
