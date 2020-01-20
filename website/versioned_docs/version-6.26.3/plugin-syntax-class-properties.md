---
id: version-6.26.3-babel-plugin-syntax-class-properties
title: babel-plugin-syntax-class-properties
sidebar_label: syntax-class-properties
original_id: babel-plugin-syntax-class-properties
---

## Installation

```sh
npm install --save-dev babel-plugin-syntax-class-properties
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["syntax-class-properties"]
}
```

### Via CLI

```sh
babel --plugins syntax-class-properties script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-class-properties"]
});
```

