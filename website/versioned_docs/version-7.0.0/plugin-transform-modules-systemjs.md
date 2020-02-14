---
id: version-7.0.0-babel-plugin-transform-modules-systemjs
title: @babel/plugin-transform-modules-systemjs
sidebar_label: transform-modules-systemjs
original_id: babel-plugin-transform-modules-systemjs
---

This plugin transforms ECMAScript modules to [SystemJS](https://github.com/systemjs/systemjs/blob/master/docs/system-register.md). The _syntax_ of Import/Export Statement (`import "./mod.js"`) and Import Expression (`import('./mod.js')`) are transformed to their SystemJS representation. Note that Babel is unaware of different resolution algorithms between implementations of ECMAScript modules and SystemJS.

## Example

**In**

```javascript
export default 42;
```

**Out**

```javascript
System.register([], function(_export, _context) {
  return {
    setters: [],
    execute: function() {
      _export("default", 42);
    },
  };
});
```

For dynamic import support (`import('./lazy.js').then(m => ...)`), enable the [@babel/plugin-syntax-dynamic-import](plugin-syntax-dynamic-import.md) plugin before this one.

## Installation

```sh
npm install --save-dev @babel/plugin-transform-modules-systemjs
```

## Usage

### With a configuration file (Recommended)

Without options:

```json
{
  "plugins": ["@babel/plugin-transform-modules-systemjs"]
}
```

With options:

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-modules-systemjs",
      {
        // outputs SystemJS.register(...)
        "systemGlobal": "SystemJS"
      }
    ]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-modules-systemjs script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-modules-systemjs"],
});
```
