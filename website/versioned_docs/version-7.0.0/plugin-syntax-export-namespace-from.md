---
id: version-7.0.0-babel-plugin-syntax-export-namespace-from
title: @babel/plugin-syntax-export-namespace-from
sidebar_label: syntax-export-namespace-from
original_id: babel-plugin-syntax-export-namespace-from
---

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-export-namespace-from
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-export-namespace-from"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-export-namespace-from script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-export-namespace-from"]
});
```

