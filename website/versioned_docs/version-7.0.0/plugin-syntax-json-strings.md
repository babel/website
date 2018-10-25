---
id: version-7.0.0-babel-plugin-syntax-json-strings
title: @babel/plugin-syntax-json-strings
sidebar_label: syntax-json-strings
original_id: babel-plugin-syntax-json-strings
---

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-json-strings
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-json-strings"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-json-strings script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-json-strings"]
});
```

