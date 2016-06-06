---
layout: docs
title: Object rest spread transform
description:
permalink: /docs/plugins/transform-object-rest-spread/
package: babel-plugin-transform-object-rest-spread
---

This plugin allows Babel to transform rest properties for object destructuring assignment and spread properties for object literals.

<blockquote class="babel-callout babel-callout-warning">
  <h4>Object Rest currently depends on the destructuring transform</h4>
  <p>Even if you are using Node 6 or a platform that supports destructuring, <a href="/docs/plugins/transform-es2015-destructuring">transform-es2015-destructuring</a> will currently need to be enabled if using object rest properties.</p>
</blockquote>

```js
// Rest properties
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

// Spread properties
let n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
```
[Try in REPL](/repl/#?evaluate=true&presets=es2015%2Cstage-0&code=%2F%2F%20Rest%20properties%0Alet%20%7B%20x%2C%20y%2C%20...z%20%7D%20%3D%20%7B%20x%3A%201%2C%20y%3A%202%2C%20a%3A%203%2C%20b%3A%204%20%7D%3B%0Aconsole.log(x)%3B%20%2F%2F%201%0Aconsole.log(y)%3B%20%2F%2F%202%0Aconsole.log(z)%3B%20%2F%2F%20%7B%20a%3A%203%2C%20b%3A%204%20%7D%0A%0A%2F%2F%20Spread%20properties%0Alet%20n%20%3D%20%7B%20x%2C%20y%2C%20...z%20%7D%3B%0Aconsole.log(n)%3B%20%2F%2F%20%7B%20x%3A%201%2C%20y%3A%202%2C%20a%3A%203%2C%20b%3A%204%20%7D)

## Installation

```sh
$ npm install babel-plugin-transform-object-rest-spread
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-object-rest-spread"]
}
```

## References

* [Proposal: Object Rest/Spread Properties for ECMAScript](https://github.com/sebmarkbage/ecmascript-rest-spread)
* [Spec](https://github.com/sebmarkbage/ecmascript-rest-spread/blob/master/Spec.md)
