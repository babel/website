---
layout: docs
title: Syntax function bind
description:
permalink: /docs/plugins/syntax-function-bind/
package: babel-plugin-syntax-function-bind
---

<blockquote class="babel-callout babel-callout-info">
  <h4>Syntax only</h4>
  <p>
    This plugin only allows Babel to parse this syntax. If you want to transform it then
    see <a href="/docs/plugins/transform-function-bind">transform-function-bind</a>.
  </p>
</blockquote>

This plugin allows Babel to parse [function bind syntax](https://github.com/zenparsing/es-function-bind).

## Installation

```sh
$ npm install babel-plugin-syntax-function-bind
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["syntax-function-bind"]
}
```
