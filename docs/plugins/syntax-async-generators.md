---
layout: docs
title: Syntax async generators
description:
permalink: /docs/plugins/syntax-async-generators/
package: babel-plugin-syntax-async-generators
---

<blockquote class="babel-callout babel-callout-info">
  <h4>Syntax only</h4>
  <p>
    This plugin only allows Babel to parse this syntax. If you want to transform it then
    see <a href="/docs/plugins/transform-regenerator">transform-regenerator</a>, <a href="/docs/plugins/transform-async-to-generator">transform-async-to-generator</a>, or <a href="/docs/plugins/transform-async-to-module-method">transform-async-to-module-method</a>.
  </p>
</blockquote>

This plugin allows Babel to parse [async generators](https://github.com/zenparsing/async-iteration/).

## Installation

```sh
$ npm install babel-plugin-syntax-async-generators
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["syntax-async-generators"]
}
```
