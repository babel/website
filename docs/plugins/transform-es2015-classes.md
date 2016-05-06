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

## Options `loose`

#### Method enumerability

Please note that in loose mode class methods **are** enumerable. This is not in line
with the spec and you may run into issues.

#### Method assignment

Under loose mode, methods are defined on the class prototype with simple assignments
instead of being defined. This can result in the following not working:

```javascript
class Foo {
  set bar() {
    throw new Error("foo!");
  }
}

class Bar extends Foo {
  bar() {
    // will throw an error when this method is defined
  }
}
```

When `Bar.prototype.foo` is defined it triggers the setter on `Foo`. This is a
case that is very unlikely to appear in production code however it's something
to keep in mind.

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
