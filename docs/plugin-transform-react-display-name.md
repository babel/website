---
id: babel-plugin-transform-react-display-name
title: @babel/plugin-transform-react-display-name
sidebar_label: react-display-name
---

> **NOTE**: This plugin is included in `@babel/preset-react`

## Example

**In**

```js
var foo = React.createClass({}); // React <= 15
var bar = createReactClass({}); // React 16+
```

**Out**

```js
var foo = React.createClass({
  displayName: "foo",
}); // React <= 15
var bar = createReactClass({
  displayName: "bar",
}); // React 16+
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-react-display-name
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-react-display-name"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-react-display-name script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-react-display-name"],
});
```
