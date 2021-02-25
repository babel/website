---
id: babel-plugin-minify-simplify
title: babel-plugin-minify-simplify
sidebar_label: minify-simplify
---

## Example

### Reduce statement into expression

**In**

```js
function foo() {
  if (x) a();
}
function foo2() {
  if (x) a();
  else b();
}
```

**Out**

```js
function foo() {
  x && a();
}
function foo2() {
  x ? a() : b();
}
```

### Make expression as uniform as possible for better compressibility

**In**

```js
undefined
foo['bar']
Number(foo)
```

**Out**

```js
void 0
foo.bar
+foo
```


## Installation

```sh
npm install babel-plugin-minify-simplify --save-dev
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["minify-simplify"]
}
```

### Via CLI

```sh
babel --plugins minify-simplify script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["minify-simplify"]
});
```

