---
id: babel-plugin-transform-jscript
title: @babel/plugin-transform-jscript
sidebar_label: jscript
---

## Example

**In**

```javascript
var foo = function bar() {};
```

**Out**

```javascript
"use strict";

var foo = (function() {
  function bar() {}

  return bar;
})();
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-jscript
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-jscript"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-jscript script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-jscript"],
});
```
