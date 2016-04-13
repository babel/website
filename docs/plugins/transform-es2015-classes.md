---
layout: docs
title: ES2015 classes transform
description:
permalink: /docs/plugins/transform-es2015-classes/
package: babel-plugin-transform-es2015-classes
---

Compile ES2015 classes to ES5

<blockquote class="babel-callout babel-callout-warning">
  <p>
    Note: Built-in classes such as Date, Array, DOM etc cannot be properly subclassed due to limitations in ES5.
  </p>
</blockquote>

## Installation

```sh
$ npm install babel-plugin-transform-es2015-classes
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-es2015-classes"]
}

// with options
{
  "plugins": [
    ["transform-es2015-classes", {
      "loose": true
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-classes script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-classes"]
});
```
