---
id: babel-plugin-minify-builtins
title: babel-plugin-minify-builtins
sidebar_label: minify-builtins
---

## Example

**In**

```javascript
Math.floor(a) + Math.floor(b)
```

**Out**

```javascript
var _Mathfloor = Math.floor;

_Mathfloor(a) + _Mathfloor(b);
```

## Installation

```sh
npm install babel-plugin-minify-builtins --save-dev
```

## Usage

### With a configuration file (Recommended)


```json
{
  "plugins": ["minify-builtins"]
}
```

### Via CLI

```sh
babel --plugins minify-builtins script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["minify-builtins"]
});
```

## Options

+ `tdz` - Account for TDZ (Temporal Dead Zone)

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
