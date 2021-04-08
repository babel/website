---
id: babel-plugin-transform-react-jsx-self
title: @babel/plugin-transform-react-jsx-self
sidebar_label: react-jsx-self
---

> **NOTE**: This plugin is included in `@babel/preset-react`

## Example

**In**

```
<sometag />
```

**Out**

```
<sometag __self={this} />
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-react-jsx-self
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-react-jsx-self"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-react-jsx-self script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-react-jsx-self"],
});
```
