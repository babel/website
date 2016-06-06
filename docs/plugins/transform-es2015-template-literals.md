---
layout: docs
title: ES2015 template literals transform
description:
permalink: /docs/plugins/transform-es2015-template-literals/
package: babel-plugin-transform-es2015-template-literals
---

Compile ES2015 template literals to ES5

## Installation

```sh
$ npm install babel-plugin-transform-es2015-template-literals
```

### Options: `loose`

In loose mode, tagged template literal objects aren't frozen.

### Options: `spec`

This option wraps all template literal expressions with `String`. See [Issue #1065](https://phabricator.babeljs.io/T1065) for more info.

**In**

```javascript
`foo${bar}`;
```

**Out**

```javascript
"foo" + String(bar);
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-es2015-template-literals"]
}

// with options
{
  "plugins": [
    ["transform-es2015-template-literals", {
      "loose": true,
      "spec": true
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-template-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-template-literals"]
});
```
