---
id: version-6.26.3-babel-plugin-transform-es2015-modules-systemjs
title: babel-plugin-transform-es2015-modules-systemjs
sidebar_label: transform-es2015-modules-systemjs
original_id: babel-plugin-transform-es2015-modules-systemjs
---

## Example

**In**

```javascript
export default 42;
```

**Out**

```javascript
System.register([], function (_export, _context) {
  return {
    setters: [],
    execute: function () {
      _export("default", 42);
    }
  };
});
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-modules-systemjs
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["transform-es2015-modules-systemjs"]
}
```

With options:

```json
{
  "plugins": [
    ["transform-es2015-modules-systemjs", {
      // outputs SystemJS.register(...)
      "systemGlobal": "SystemJS"
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-modules-systemjs script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-modules-systemjs"]
});
```

