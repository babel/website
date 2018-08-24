---
id: version-6.26.3-babel-plugin-transform-jscript
title: babel-plugin-transform-jscript
sidebar_label: transform-jscript
original_id: babel-plugin-transform-jscript
---

## Example

**In**

```javascript
var foo = function bar() {

};
```

**Out**

```javascript
"use strict";

var foo = (function () {
  function bar() {}

  return bar;
})();
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-jscript
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-jscript"]
}
```

### Via CLI

```sh
babel --plugins transform-jscript script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-jscript"]
});
```

