---
id: babel-plugin-minify-replace
title: babel-plugin-minify-replace
sidebar_label: minify-replace
---

## Example

**Options**

```javascript
[
  {
    identifierName: "__DEV__",
    replacement: {
      type: "numericLiteral",
      value: 0,
    },
  },
]
```

**In**

```javascript
if (!__DEV__) {
  foo();
}
if (a.__DEV__) {
  foo();
}
```

**Out**

```javascript
if (!0) {
  foo();
}
if (a.__DEV__) {
  foo();
}
```

## Installation

```sh
npm install babel-plugin-minify-replace --save-dev
```

## Usage

### With a configuration file (Recommended)

```json
// without options
{
  "plugins": ["minify-replace"]
}
```

```json
// with options
{
  "plugins": [
    ["minify-replace", {
      "replacements": [{
        "identifierName": "__DEV__",
        "replacement": {
          "type": "booleanLiteral",
          "value": true
        }
      }]
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins minify-replace script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["minify-replace"]
});
```

