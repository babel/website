---
id: version-6.26.3-babel-plugin-transform-es2015-function-name
title: babel-plugin-transform-es2015-function-name
sidebar_label: transform-es2015-function-name
original_id: babel-plugin-transform-es2015-function-name
---

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-function-name
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-function-name"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-function-name script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-function-name"]
});
```

