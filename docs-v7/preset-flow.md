---
title: babel-preset-flow
sidebar_label: flow
---

This preset includes the following plugins:

- [transform-flow-strip-types](https://babeljs.io/docs/plugins/transform-flow-strip-types/)

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
npm install --save-dev babel-preset-flow
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["flow"]
}
```

### Via CLI

```sh
babel --presets flow script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["flow"]
});
```

