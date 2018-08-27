---
id: version-7.0.0-babel-plugin-syntax-class-properties
title: @babel/plugin-syntax-class-properties
sidebar_label: syntax-class-properties
original_id: babel-plugin-syntax-class-properties
---

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-class-properties
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-class-properties"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-class-properties script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-class-properties"]
});
```

