---
id: version-6.x-babel-plugin-syntax-dynamic-import
title: babel-plugin-syntax-dynamic-import
sidebar_label: syntax-dynamic-import
original_id: babel-plugin-syntax-dynamic-import
---

## Installation

```sh
npm install --save-dev babel-plugin-syntax-dynamic-import
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-dynamic-import"]
}
```

### Via CLI

```sh
babel --plugins syntax-dynamic-import script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-dynamic-import"]
});
```

