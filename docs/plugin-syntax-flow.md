---
id: babel-plugin-syntax-flow
title: @babel/plugin-syntax-flow
sidebar_label: syntax-flow
---

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-flow
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-flow"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-flow script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-flow"]
});
```

