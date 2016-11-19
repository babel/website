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
    see <a href="/docs/plugins/transform-async-generator-functions/">async-generator-functions</a> and <a href="/docs/plugins/transform-regenerator">transform-regenerator</a> if generator support is not supported natively.
  </p>
</blockquote>

This plugin allows Babel to parse [async generators](https://github.com/zenparsing/async-iteration/) only.

## Installation

```sh
$ npm install --save-dev babel-plugin-syntax-async-generators
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["syntax-async-generators"]
}
```
