---
id: babel-plugin-minify-simplify
title: babel-plugin-minify-simplify
sidebar_label: minify-simplify
---

## Example

### Reduce statement into expression

**In**

```js title="JavaScript"
function foo() {
  if (x) a();
}
function foo2() {
  if (x) a();
  else b();
}
```

**Out**

```js title="JavaScript"
function foo() {
  x && a();
}
function foo2() {
  x ? a() : b();
}
```

### Make expression as uniform as possible for better compressibility

**In**

```js title="JavaScript"
undefined
foo['bar']
Number(foo)
```

**Out**

```js title="JavaScript"
void 0
foo.bar
+foo
```


## Installation

```shell npm2yarn
npm install babel-plugin-minify-simplify --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["minify-simplify"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins minify-simplify script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["minify-simplify"]
});
```

