---
id: version-6.26.3-babel-plugin-transform-async-functions
title: babel-plugin-transform-async-functions
sidebar_label: transform-async-functions
original_id: babel-plugin-transform-async-functions
---

## Installation

```sh
npm install --save-dev babel-plugin-transform-async-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-async-functions"]
}
```

### Via CLI

```sh
babel --plugins transform-async-functions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-async-functions"]
});
```

