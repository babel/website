---
id: babel-preset-flow
title: @babel/preset-flow
sidebar_label: flow
---

This preset includes the following plugins:

- [@babel/plugin-transform-flow-strip-types](plugin-transform-flow-strip-types.md)

## Example

**In**

```javascript
function foo(one: any, two: number, three?): string {}
```

**Out**

```javascript
function foo(one, two, three) {}
```

## Installation

```sh
npm install --save-dev @babel/preset-flow
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["@babel/preset-flow"]
}
```

### Via CLI

```sh
babel --presets @babel/preset-flow script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  presets: ["@babel/preset-flow"],
});
```
