---
id: version-6.26.3-babel-plugin-transform-react-jsx-self
title: babel-plugin-transform-react-jsx-self
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
npm install --save-dev babel-plugin-transform-react-jsx-self
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-react-jsx-self"]
}
```

### Via CLI

```sh
babel --plugins transform-react-jsx-self script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-jsx-self"]
});
```

