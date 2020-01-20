---
id: version-6.26.3-babel-plugin-transform-inline-consecutive-adds
title: babel-plugin-transform-inline-consecutive-adds
sidebar_label: transform-inline-consecutive-adds
original_id: babel-plugin-transform-inline-consecutive-adds
---

## Example

**In**

```javascript
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

```javascript
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

```sh
npm install babel-plugin-transform-inline-consecutive-adds
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["transform-inline-consecutive-adds"]
}
```

### Via CLI

```sh
babel --plugins transform-inline-consecutive-adds script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-inline-consecutive-adds"]
});
```

