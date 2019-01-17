---
id: version-7.1.0-babel-plugin-syntax-pipeline-operator
title: @babel/plugin-syntax-pipeline-operator
sidebar_label: syntax-pipeline-operator
original_id: babel-plugin-syntax-pipeline-operator
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-pipeline-operator](plugin-proposal-pipeline-operator.md) to _both_ parse and transform this syntax.

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

