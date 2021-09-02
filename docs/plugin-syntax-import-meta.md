---
id: babel-plugin-syntax-import-meta
title: @babel/plugin-syntax-import-meta
sidebar_label: syntax-import-meta
---

> **NOTE**: This plugin is included in `@babel/preset-env`, in [ES2020](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

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

