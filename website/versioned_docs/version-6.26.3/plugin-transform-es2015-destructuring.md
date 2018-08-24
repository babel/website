---
id: version-6.26.3-babel-plugin-transform-es2015-destructuring
title: babel-plugin-transform-es2015-destructuring
sidebar_label: transform-es2015-destructuring
original_id: babel-plugin-transform-es2015-destructuring
---

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-destructuring
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-destructuring"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-destructuring script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-destructuring"]
});
```

