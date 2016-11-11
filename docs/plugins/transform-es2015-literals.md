---
layout: docs
title: ES2015 literals transform
description:
permalink: /docs/plugins/transform-es2015-literals/
package: babel-plugin-transform-es2015-literals
---

Compile ES2015 integer and unicode literals to ES5

ES2015

```js
var b = 0b11; // binary integer literal
var o = 0o7; // octal integer literal
const u = 'Hello\u{000A}\u{0009}!'; // unicode string literals, newline and tab
```

ES5

```js
var b = 3; // binary integer literal
var o = 7; // octal integer literal
const u = 'Hello\n\t!'; // unicode string literals, newline and tab
```

For template literals transformation see [transform-es2015-template-literals](/docs/plugins/transform-es2015-template-literals)

## Installation

```sh
$ npm install babel-plugin-transform-es2015-literals
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-es2015-literals"]
}
```
