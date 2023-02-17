---
id: babel-plugin-minify-flip-comparisons
title: babel-plugin-minify-flip-comparisons
sidebar_label: minify-flip-comparisons
---

## Example

**In**

```js title="JavaScript"
const foo = a === 1;
if (bar !== null) {
  var baz = 0;
}
```

**Out**

```js title="JavaScript"
const foo = 1 === a;
if (null !== bar) {
  var baz = 0;
}
```

## Installation

```shell npm2yarn
npm install babel-plugin-minify-flip-comparisons --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["minify-flip-comparisons"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins minify-flip-comparisons script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["minify-flip-comparisons"]
});
```

