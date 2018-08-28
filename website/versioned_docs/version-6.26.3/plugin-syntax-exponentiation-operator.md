---
id: version-6.26.3-babel-plugin-syntax-exponentiation-operator
title: babel-plugin-syntax-exponentiation-operator
sidebar_label: syntax-exponentiation-operator
original_id: babel-plugin-syntax-exponentiation-operator
---

## Installation

```sh
npm install --save-dev babel-plugin-syntax-exponentiation-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-exponentiation-operator"]
}
```

### Via CLI

```sh
babel --plugins syntax-exponentiation-operator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-exponentiation-operator"]
});
```

