---
id: babel-plugin-transform-simplify-comparison-operators
title: babel-plugin-transform-simplify-comparison-operators
sidebar_label: simplify-comparison-operators
---

## Example

**In**

```js title="JavaScript"
typeof foo === "object";
```

**Out**

```js title="JavaScript"
typeof foo == "object";
```

## Installation

```shell npm2yarn
npm install babel-plugin-transform-simplify-comparison-operators --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["transform-simplify-comparison-operators"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins transform-simplify-comparison-operators script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["transform-simplify-comparison-operators"],
});
```
