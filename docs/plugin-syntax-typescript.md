---
id: babel-plugin-syntax-typescript
title: babel-plugin-syntax-typescript
sidebar_label: syntax-typescript
---

```sh
npm install --save-dev @babel/plugin-syntax-typescript
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-typescript"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-typescript script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-typescript"]
});
```

