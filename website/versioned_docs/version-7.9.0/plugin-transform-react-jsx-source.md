---
id: version-7.9.0-babel-plugin-transform-react-jsx-source
title: @babel/plugin-transform-react-jsx-source
sidebar_label: transform-react-jsx-source
original_id: babel-plugin-transform-react-jsx-source
---

## Example

**In**

```
<sometag />
```

**Out**

```
<sometag __source={ { fileName: 'this/file.js', lineNumber: 10, columnNumber: 1 } } />
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-react-jsx-source
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-react-jsx-source"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-react-jsx-source script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-react-jsx-source"]
});
```

