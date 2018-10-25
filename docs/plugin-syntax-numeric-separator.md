---
id: babel-plugin-syntax-numeric-separator
title: @babel/plugin-syntax-numeric-separator
sidebar_label: syntax-numeric-separator
---


## Installation

```sh
npm install --save-dev @babel/plugin-syntax-numeric-separator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-numeric-separator"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-numeric-separator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-numeric-separator"]
});
```

