---
id: babel-plugin-transform-regexp-constructors
title: babel-plugin-transform-regexp-constructors
sidebar_label: regexp-constructors
---

## Example

**In**

```js title="JavaScript"
const foo = "ab+";
var a = new RegExp(foo + "c", "i");
```

**Out**

```js title="JavaScript"
const foo = "ab+";
var a = /ab+c/i;
```

## Installation

```shell npm2yarn
npm install babel-plugin-transform-regexp-constructors --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["transform-regexp-constructors"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins transform-regexp-constructors script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["transform-regexp-constructors"],
});
```
