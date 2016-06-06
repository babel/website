---
layout: docs
title: Regenerator transform
description:
permalink: /docs/plugins/transform-regenerator/
package: babel-plugin-transform-regenerator
---

This plugin uses the [regenerator](https://github.com/facebook/regenerator) module to
transform async and generator functions. `regeneratorRuntime` is not included.

<blockquote class="babel-callout babel-callout-info">
  <h4>Runtime required</h4>
  <p>
    You need to use either the <a href="/docs/usage/polyfill">Babel polyfill</a> or the <a href="https://github.com/facebook/regenerator/blob/master/runtime.js">regenerator runtime</a> so that <code>regeneratorRuntime</code> will be defined.
  </p>
</blockquote>

<blockquote class="babel-callout babel-callout-warning">
  <h4>Async functions</h4>
  <p>
    These are only usable if you enable their syntax plugin. See <a href="/docs/plugins/syntax-async-functions">syntax-async-functions</a> for information.
  </p>
</blockquote>

## Example

**In**

```javascript
function* a() {
  yield 1;
}
```

**Out**

```javascript
var _marked = [a].map(regeneratorRuntime.mark);

function a() {
  return regeneratorRuntime.wrap(function a$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
```

[Try in REPL](http://babeljs.io/repl/#?evaluate=true&lineWrap=true&presets=es2015%2Ces2015-loose%2Creact&experimental=false&loose=false&spec=false&code=function%20*range(max%2C%20step)%20%7B%0A%20%20var%20count%20%3D%200%3B%0A%20%20step%20%3D%20step%20%7C%7C%201%3B%0A%20%0A%20%20for%20(var%20i%20%3D%200%3B%20i%20%3C%20max%3B%20i%20%2B%3D%20step)%20%7B%0A%20%20%20%20count%2B%2B%3B%0A%20%20%20%20yield%20i%3B%0A%20%20%7D%0A%20%0A%20%20return%20count%3B%0A%7D%0A%20%0Avar%20gen%20%3D%20range(20%2C%203)%2C%20info%3B%0A%20%0Awhile%20(!(info%20%3D%20gen.next()).done)%20%7B%0A%20%20console.log(info.value)%3B%0A%7D%0A%20%0Aconsole.log(%22steps%20taken%3A%20%22%20%2B%20info.value)%3B&playground=true)

## Installation

```sh
$ npm install babel-plugin-transform-regenerator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-regenerator"]
}
// with options
{
  "plugins": [
    ["transform-regenerator", {
        asyncGenerators: false, // true by default
        generators: false, // true by default
        async: false // true by default
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-regenerator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-regenerator"]
});
```
