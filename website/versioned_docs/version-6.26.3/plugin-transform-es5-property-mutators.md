---
id: version-6.26.3-babel-plugin-transform-es5-property-mutators
title: babel-plugin-transform-es5-property-mutators
sidebar_label: transform-es5-property-mutators
original_id: babel-plugin-transform-es5-property-mutators
---

## Example

**In**

```javascript
var foo = {
  get bar() {
    return "bar";
  }
};
```

**Out**

```javascript
var foo = Object.defineProperties({}, {
  bar: {
    get: function () {
      return "bar";
    },
    enumerable: true,
    configurable: true
  }
});
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es5-property-mutators
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["transform-es5-property-mutators"]
}
```

### Via CLI

```sh
babel --plugins transform-es5-property-mutators script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es5-property-mutators"]
});
```

