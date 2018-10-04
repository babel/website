---
id: version-7.0.0-babel-plugin-transform-react-jsx-self
title: @babel/plugin-transform-react-jsx-self
sidebar_label: transform-react-jsx-self
original_id: babel-plugin-transform-react-jsx-self
---

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

### Via `.babelrc` (Recommended)

**.babelrc**

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
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-react-jsx-self"]
});
```

