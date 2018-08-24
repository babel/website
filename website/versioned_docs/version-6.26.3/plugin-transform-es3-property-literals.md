---
id: version-6.26.3-babel-plugin-transform-es3-property-literals
title: babel-plugin-transform-es3-property-literals
sidebar_label: transform-es3-property-literals
original_id: babel-plugin-transform-es3-property-literals
---

## Example

**In**

```javascript
var foo = {
  catch: function () {}
};
```

**Out**

```javascript
var foo = {
  "catch": function () {}
};
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es3-property-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es3-property-literals"]
}
```

### Via CLI

```sh
babel --plugins transform-es3-property-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es3-property-literals"]
});
```

