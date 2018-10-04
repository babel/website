---
id: version-7.0.0-babel-plugin-transform-remove-console
title: babel-plugin-transform-remove-console
sidebar_label: transform-remove-console
original_id: babel-plugin-transform-remove-console
---

## Example

**In**

```javascript
console.log("foo");
console.error("bar");
```

**Out**

```javascript
```

## Installation

```sh
npm install babel-plugin-transform-remove-console --save-dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
// without options
{
  "plugins": ["transform-remove-console"]
}
```

```json
// with options
{
  "plugins": [ ["transform-remove-console", { "exclude": [ "error", "warn"] }] ]
}
```

### Via CLI

```sh
babel --plugins transform-remove-console script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-remove-console"]
});
```

## Options

+ `exclude` - An array of console methods to exclude from removal.

