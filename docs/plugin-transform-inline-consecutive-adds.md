---
id: babel-plugin-transform-inline-consecutive-adds
title: "@babel/plugin-transform-inline-consecutive-adds"
sidebar_label: inline-consecutive-adds
---

## Example

**In**

```js title="JavaScript"
const foo = {};
foo.a = 42;
foo.b = ["hi"];
foo.c = bar();
foo.d = "str";

...
const bar = [];
bar.push(1);
bar.push(2);
```

**Out**

```js title="JavaScript"
const foo = {
  a: 42,
  b: ["hi"],
  c: bar(),
  d: "str"
};

...
const bar = [1, 2];
```

## Installation

```shell npm2yarn
npm install babel-plugin-transform-inline-consecutive-adds --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["transform-inline-consecutive-adds"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins transform-inline-consecutive-adds script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["transform-inline-consecutive-adds"],
});
```
