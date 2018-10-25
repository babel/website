---
id: version-6.26.3-babel-plugin-syntax-do-expressions
title: babel-plugin-syntax-do-expressions
sidebar_label: syntax-do-expressions
original_id: babel-plugin-syntax-do-expressions
---

## Installation

```sh
npm install --save-dev babel-plugin-syntax-do-expressions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-do-expressions"]
}
```

### Via CLI

```sh
babel --plugins syntax-do-expressions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-do-expressions"]
});
```

