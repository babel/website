---
id: babel-plugin-syntax-import-meta
title: @babel/plugin-syntax-import-meta
sidebar_label: syntax-import-meta
---

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-import-meta
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-import-meta"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-import-meta script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-import-meta"]
});
```

