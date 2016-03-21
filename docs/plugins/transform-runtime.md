---
layout: docs
title: Runtime transform
description:
permalink: /docs/plugins/transform-runtime/
package: babel-plugin-transform-runtime
---

Externalise references to helpers and builtins, automatically polyfilling your code without polluting globals

## Installation

```sh
$ npm install babel-plugin-transform-runtime
```

You should also install [babel-runtime](https://www.npmjs.com/package/babel-runtime) itself:

```sh
$ npm install babel-runtime
```

<blockquote class="babel-callout babel-callout-info">
  <h4>Production vs. development dependencies</h4>
  <p>
    In most cases, you should install babel-plugin-transform-runtime as a development dependency (with <code>--save-dev</code>) and babel-runtime as a production dependency (with <code>--save</code>).
  </p>
  <p>
    The transformation plugin is typically used only in development, but the runtime itself will be depended on by your deployed/published code.
  </p>
</blockquote>



## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-runtime"]
}

// with options
{
  "plugins": [
    ["transform-runtime", {
      "polyfill": false,
      "regenerator": true
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-runtime script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-runtime"]
});
```
