---
id: version-7.0.0-babel-plugin-transform-property-mutators
title: @babel/plugin-transform-property-mutators
sidebar_label: transform-property-mutators
original_id: babel-plugin-transform-property-mutators
---

## Example

**In**

```javascript
var foo = {
  get bar() {
    return this._bar;
  },
  set bar(value) {
    this._bar = value;
  }
};
```

**Out**

```javascript
var foo = Object.defineProperties({}, {
  bar: {
    get: function () {
      return this._bar;
    },
    set: function (value) {
      this._bar = value;
    },
    configurable: true,
    enumerable: true
  }
});
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-property-mutators
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-property-mutators"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-property-mutators script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-property-mutators"]
});
```

