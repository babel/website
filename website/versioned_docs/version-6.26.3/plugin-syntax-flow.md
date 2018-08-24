---
id: version-6.26.3-babel-plugin-syntax-flow
title: babel-plugin-syntax-flow
sidebar_label: syntax-flow
original_id: babel-plugin-syntax-flow
---

## Installation

```sh
npm install --save-dev babel-plugin-syntax-flow
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-flow"]
}
```

### Via CLI

```sh
babel --plugins syntax-flow script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-flow"]
});
```

