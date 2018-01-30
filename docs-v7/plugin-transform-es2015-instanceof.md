---
title: babel-plugin-transform-es2015-instanceof
sidebar_label: transform-es2015-instanceof
---

```sh
npm install --save-dev babel-plugin-transform-es2015-instanceof
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-instanceof"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-instanceof script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-instanceof"]
});
```

