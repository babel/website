---
layout: docs
title: ES2015 arrow functions transform
description:
permalink: /docs/plugins/transform-es2015-arrow-functions/
package: babel-plugin-transform-es2015-arrow-functions
---

Compile ES2015 arrow functions to ES5

## Example

**In**

```javascript
var a = () => {};
var a = (b) => b;

const double = [1,2,3].map((num) => num * 2);
console.log(double); // [2,4,6]
```

**Out**

```javascript
var a = function a() {};
var a = function a(b) {
  return b;
};

var double = [1, 2, 3].map(function (num) {
  return num * 2;
});
console.log(double); // [2,4,6]
```

[Try in REPL](http://babeljs.io/repl/#?evaluate=true&lineWrap=true&presets=es2015%2Ces2015-loose%2Creact&experimental=false&loose=false&spec=false&code=var%20a%20%3D%20()%20%3D%3E%20%7B%7D%3B%0Avar%20a%20%3D%20(b)%20%3D%3E%20b%3B%0A%0Aconst%20double%20%3D%20%5B1%2C2%2C3%5D.map((num)%20%3D%3E%20num%20*%202)%3B%0Aconsole.log(double)%3B%20%2F%2F%20%5B2%2C4%2C6%5D&playground=true)

## Installation

```sh
$ npm install babel-plugin-transform-es2015-arrow-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-es2015-arrow-functions"]
}

// with options
{
  "plugins": [
    ["transform-es2015-arrow-functions", { "spec": true }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-arrow-functions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-arrow-functions"]
});
```
