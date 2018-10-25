---
id: version-7.0.0-babel-plugin-syntax-optional-chaining
title: @babel/plugin-syntax-optional-chaining
sidebar_label: syntax-optional-chaining
original_id: babel-plugin-syntax-optional-chaining
---

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-optional-chaining
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-optional-chaining"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-optional-chaining script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-optional-chaining"]
});
```

