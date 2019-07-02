---
id: version-6.26.3-babel-plugin-transform-react-display-name
title: babel-plugin-transform-react-display-name
sidebar_label: transform-react-display-name
original_id: babel-plugin-transform-react-display-name
---

## Example

**In**

```js
var foo = React.createClass({}); // React <= 15
var bar = createReactClass({});  // React 16+
```

**Out**

```js
var foo = React.createClass({
  displayName: "foo"
}); // React <= 15
var bar = createReactClass({
  displayName: "bar"
}); // React 16+
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-react-display-name
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-react-display-name"]
}
```

### Via CLI

```sh
babel --plugins transform-react-display-name script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-display-name"]
});
```

