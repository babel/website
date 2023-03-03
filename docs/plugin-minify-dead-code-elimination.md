---
id: babel-plugin-minify-dead-code-elimination
title: babel-plugin-minify-dead-code-elimination
sidebar_label: minify-dead-code-elimination
---

## Example

**In**

```js title="JavaScript"
function foo() {var x = 1;}
function bar() { var x = f(); }
function baz() {
  var x = 1;
  console.log(x);
  function unused() {
    return 5;
  }
}
```

**Out**

```js title="JavaScript"
function foo() {}
function bar() { f(); }
function baz() {
  console.log(1);
}
```

## Installation

```shell npm2yarn
npm install babel-plugin-minify-dead-code-elimination --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="JSON"
// without options
{
  "plugins": ["minify-dead-code-elimination"]
}

// with options
{
  "plugins": ["minify-dead-code-elimination", { "optimizeRawSize": true }]
}
```

### Via CLI

```sh title="Shell"
babel --plugins minify-dead-code-elimination script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["minify-dead-code-elimination"]
});
```

## Options

+ `keepFnName` - prevent plugin from removing function name. Useful for code depending on `fn.name`
+ `keepFnArgs` - prevent plugin from removing function args. Useful for code depending on `fn.length`
+ `keepClassName` - prevent plugin from removing class name. Useful for code depending on `cls.name`
+ `tdz` - Account for TDZ (Temporal Dead Zone)

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
