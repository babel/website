---
id: version-7.0.0-babel-plugin-transform-simplify-comparison-operators
title: babel-plugin-transform-simplify-comparison-operators
sidebar_label: transform-simplify-comparison-operators
original_id: babel-plugin-transform-simplify-comparison-operators
---

## Example

**In**

```javascript
typeof foo === "object";
```

**Out**

```javascript
typeof foo == "object";
```

## Installation

```sh
npm install babel-plugin-transform-simplify-comparison-operators --save-dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-simplify-comparison-operators"]
}
```

### Via CLI

```sh
babel --plugins transform-simplify-comparison-operators script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-simplify-comparison-operators"]
});
```

