---
layout: docs
title: Syntax do expressions
description:
permalink: /docs/plugins/syntax-do-expressions/
package: babel-plugin-syntax-do-expressions
---

<blockquote class="babel-callout babel-callout-info">
  <h4>Syntax only</h4>
  <p>
    This plugin only allows Babel to parse this syntax. If you want to transform it then
    see <a href="/docs/plugins/transform-do-expressions">transform-do-expressions</a>.
  </p>
</blockquote>

This plugin allows Babel to parse [do-expressions](http://wiki.ecmascript.org/doku.php?id=strawman:do_expressions).

## Installation

```sh
$ npm install babel-plugin-syntax-do-expressions
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["syntax-do-expressions"]
}
```
