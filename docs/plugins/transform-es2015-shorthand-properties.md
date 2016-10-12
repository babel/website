---
layout: docs
title: ES2015 shorthand properties transform
description:
permalink: /docs/plugins/transform-es2015-shorthand-properties/
package: babel-plugin-transform-es2015-shorthand-properties
---

Compile ES2015 shorthand properties and methods to ES5

ES2015
```js
var o = { a, b, c };
```
ES5
```js
var o = { a: a, b: b, c:c };
```

ES2015
```js
var cat = {
  getName(){
    return name;
  }
};
```
ES5
```js
var cat = {
  getName: function () {
    return name;
  }
};
```

## Installation

```sh
$ npm install babel-plugin-transform-es2015-shorthand-properties
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-es2015-shorthand-properties"]
}
```
