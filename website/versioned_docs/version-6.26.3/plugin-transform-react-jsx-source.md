---
id: version-6.26.3-babel-plugin-transform-react-jsx-source
title: babel-plugin-transform-react-jsx-source
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
<sometag __source={ { fileName: 'this/file.js', lineNumber: 10 } } />
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-react-jsx-source
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["transform-react-jsx-source"]
}
```

### Via CLI

```sh
babel --plugins transform-react-jsx-source script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-jsx-source"]
});
```

