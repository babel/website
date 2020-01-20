---
id: version-6.26.3-babel-plugin-syntax-export-extensions
title: babel-plugin-syntax-export-extensions
sidebar_label: syntax-export-extensions
original_id: babel-plugin-syntax-export-extensions
---

## Installation

```sh
npm install --save-dev babel-plugin-syntax-export-extensions
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["syntax-export-extensions"]
}
```

### Via CLI

```sh
babel --plugins syntax-export-extensions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-export-extensions"]
});
```

