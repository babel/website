---
id: version-6.26.3-babel-plugin-transform-es2015-instanceof
title: babel-plugin-transform-es2015-instanceof
sidebar_label: transform-es2015-instanceof
original_id: babel-plugin-transform-es2015-instanceof
---

```sh
npm install --save-dev babel-plugin-transform-es2015-instanceof
```

## Usage

### With a configuration file (Recommended)

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

