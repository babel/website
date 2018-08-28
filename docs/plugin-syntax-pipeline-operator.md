---
id: babel-plugin-syntax-pipeline-operator
title: @babel/plugin-syntax-pipeline-operator
sidebar_label: syntax-pipeline-operator
---

## Installation

```sh
$ npm install @babel/plugin-syntax-pipeline-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-pipeline-operator"]
}
```

### Via CLI

```sh
$ babel --plugins @babel/plugin-syntax-pipeline-operator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-pipeline-operator"]
});
```

