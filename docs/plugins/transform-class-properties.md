---
layout: docs
title: Class properties transform
description:
permalink: /docs/plugins/transform-class-properties/
package: babel-plugin-transform-class-properties
---

This plugin allows Babel to transform class properties.

```js
class MyClass {
  myProp = 42;
  static myStaticProp = 21;

  constructor() {
    console.log(this.myProp); // Prints '42'
    console.log(MyClass.myStaticProp); // Prints '21'
  }
}
```
[Try in REPL](/repl/#?evaluate=true&presets=es2015%2Cstage-0&code=class%20MyClass%20%7B%0A%20%20myProp%20%3D%2042%3B%0A%20%20static%20myStaticProp%20%3D%2021%3B%0A%0A%20%20constructor()%20%7B%0A%20%20%20%20console.log(this.myProp)%3B%20%2F%2F%20Prints%20'42'%0A%20%20%20%20console.log(MyClass.myStaticProp)%3B%20%2F%2F%20Prints%20'21'%0A%20%20%7D%0A%7D%0A%0Anew%20MyClass()%3B)

## Installation

```sh
$ npm install babel-plugin-transform-class-properties
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-class-properties"]
}
```

## References

* [Proposal: ES Class Fields & Static Properties](https://github.com/jeffmo/es-class-static-properties-and-fields)
