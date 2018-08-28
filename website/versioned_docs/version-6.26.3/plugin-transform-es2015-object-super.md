---
id: version-6.26.3-babel-plugin-transform-es2015-object-super
title: babel-plugin-transform-es2015-object-super
sidebar_label: transform-es2015-object-super
original_id: babel-plugin-transform-es2015-object-super
---

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-object-super
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-object-super"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-object-super script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-object-super"]
});
```

