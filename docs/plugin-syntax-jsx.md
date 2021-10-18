---
id: babel-plugin-syntax-jsx
title: @babel/plugin-syntax-jsx
sidebar_label: syntax-jsx
---

> #### Syntax only
>
> Using this plugin directly only enables Babel to parse this syntax. If you want to transform JSX syntax then use the [transform-react-jsx](plugin-transform-react-jsx.md) plugin or [react](preset-react.md) preset to _both_ parse and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-jsx
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-jsx"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-jsx script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-jsx"],
});
```
