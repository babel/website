---
id: babel-plugin-transform-react-jsx-self
title: "@babel/plugin-transform-react-jsx-self"
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

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-react-jsx-self
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-react-jsx-self"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-react-jsx-self script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-react-jsx-self"],
});
```
