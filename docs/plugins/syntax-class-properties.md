---
layout: docs
title: Syntax class properties
description:
permalink: /docs/plugins/syntax-class-properties/
package: babel-plugin-syntax-class-properties
---

<blockquote class="babel-callout babel-callout-info">
  <h4>Syntax only</h4>
  <p>
    This plugin only allows Babel to parse this syntax. If you want to transform it then
    see <a href="/docs/plugins/transform-class-properties">transform-class-properties</a>.
  </p>
</blockquote>

This plugin allows Babel to parse [class properties](https://github.com/jeffmo/es-class-static-properties-and-fields).

## Installation

```sh
$ npm install babel-plugin-syntax-class-properties
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["syntax-class-properties"]
}
```

## Example
This plugin transforms es2015 static class properties as
well as properties declared with the es2016 property initializer syntax.
Below is a class with four class properties which will be transformed.

```js
  class Bork {
    //Property initilizer syntax
    instanceProperty = "bork";
    boundFunction = () => {
      return this.instanceProperty;
    }
    
    //Static class properties
    static staticProperty = "babeliscool";
    static staticFunction = function() {
      return Bork.staticProperty;
    }
  }

  let myBork = new Bork;

  //Property initializers are not on the prototype.
  myBork.prototype.boundFunction; // > undefined

  //Bound functions are bound to the class instance.
  myBork.boundFunction.call(undefined); // > "bork"

  //Static function exists on the class.
  Bork.staticFunction(); // > "babelIsCool"
```
