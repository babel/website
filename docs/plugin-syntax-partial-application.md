---
id: babel-plugin-syntax-partial-application
title: @babel/plugin-syntax-partial-application
sidebar_label: syntax-partial-application
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-partial-application](plugin-proposal-partial-application.md) to _both_ parse and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-partial-application
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-partial-application"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-partial-application script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-partial-application"]
});
```
