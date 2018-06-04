---
id: babel-plugin-proposal-pipeline-operator
title: babel-plugin-proposal-pipeline-operator
sidebar_label: proposal-pipeline-operator
---

## Installation

```sh
$ npm install @babel/plugin-proposal-pipeline-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-proposal-pipeline-operator"]
}
```

### Via CLI

```sh
$ babel --plugins @babel/plugin-proposal-pipeline-operator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-proposal-pipeline-operator"]
});
```

