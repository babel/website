---
id: version-7.0.0-babel-plugin-syntax-logical-assignment-operators
title: @babel/plugin-syntax-logical-assignment-operators
sidebar_label: syntax-logical-assignment-operators
original_id: babel-plugin-syntax-logical-assignment-operators
---

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-logical-assignment-operators
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-logical-assignment-operators"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-logical-assignment-operators script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-logical-assignment-operators"]
});
```

