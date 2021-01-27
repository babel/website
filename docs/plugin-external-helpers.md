---
id: babel-plugin-external-helpers
title: @babel/plugin-external-helpers
sidebar_label: external-helpers
---

```sh
npm install --save-dev @babel/plugin-external-helpers
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-external-helpers"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-external-helpers script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-external-helpers"]
});
```

