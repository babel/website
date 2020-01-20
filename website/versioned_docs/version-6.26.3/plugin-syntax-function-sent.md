---
id: version-6.26.3-babel-plugin-syntax-function-sent
title: babel-plugin-syntax-function-sent
sidebar_label: syntax-function-sent
original_id: babel-plugin-syntax-function-sent
---

## Installation

```sh
npm install --save-dev babel-plugin-syntax-function-sent
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["syntax-function-sent"]
}
```

### Via CLI

```sh
babel --plugins syntax-function-sent script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-function-sent"]
});
```

