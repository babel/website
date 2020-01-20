---
id: version-6.26.3-babel-plugin-transform-es2015-sticky-regex
title: babel-plugin-transform-es2015-sticky-regex
sidebar_label: transform-es2015-sticky-regex
original_id: babel-plugin-transform-es2015-sticky-regex
---

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-sticky-regex
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["transform-es2015-sticky-regex"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-sticky-regex script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-sticky-regex"]
});
```

