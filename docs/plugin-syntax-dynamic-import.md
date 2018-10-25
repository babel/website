---
id: babel-plugin-syntax-dynamic-import
title: @babel/plugin-syntax-dynamic-import
sidebar_label: syntax-dynamic-import
---

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-dynamic-import script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-dynamic-import"]
});
```

