---
id: babel-plugin-syntax-bigint
title: @babel/plugin-syntax-bigint
sidebar_label: syntax-bigint
---


## Installation

```sh
npm install --save-dev @babel/plugin-syntax-bigint
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-bigint"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-bigint script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["@babel/plugin-syntax-bigint"]
});
```

