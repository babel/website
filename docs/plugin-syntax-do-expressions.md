---
id: babel-plugin-syntax-do-expressions
title: @babel/plugin-syntax-do-expressions
sidebar_label: syntax-do-expressions
---

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-do-expressions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-do-expressions"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-do-expressions script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-do-expressions"]
});
```

