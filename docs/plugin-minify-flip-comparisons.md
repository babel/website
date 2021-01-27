---
id: babel-plugin-minify-flip-comparisons
title: babel-plugin-minify-flip-comparisons
sidebar_label: minify-flip-comparisons
---

## Example

**In**

```javascript
const foo = a === 1;
if (bar !== null) {
  var baz = 0;
}
```

**Out**

```javascript
const foo = 1 === a;
if (null !== bar) {
  var baz = 0;
}
```

## Installation

```sh
npm install babel-plugin-minify-flip-comparisons --save-dev
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["minify-flip-comparisons"]
}
```

### Via CLI

```sh
babel --plugins minify-flip-comparisons script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["minify-flip-comparisons"]
});
```

