---
id: version-6.26.3-babel-plugin-syntax-decorators
title: babel-plugin-syntax-decorators
sidebar_label: syntax-decorators
original_id: babel-plugin-syntax-decorators
---

## Installation

```sh
npm install --save-dev babel-plugin-syntax-decorators
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["syntax-decorators"]
}
```

### Via CLI

```sh
babel --plugins syntax-decorators script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-decorators"]
});
```

