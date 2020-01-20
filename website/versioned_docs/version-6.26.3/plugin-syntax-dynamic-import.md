---
id: version-6.26.3-babel-plugin-syntax-dynamic-import
title: babel-plugin-syntax-dynamic-import
sidebar_label: syntax-dynamic-import
original_id: babel-plugin-syntax-dynamic-import
---

## Installation

```sh
npm install --save-dev babel-plugin-syntax-dynamic-import
```

## Usage

### With a configuration file (Recommended)

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

