---
layout: docs
title: Syntax exponentiation operator
description:
permalink: /docs/plugins/syntax-exponentiation-operator/
package: babel-plugin-syntax-exponentiation-operator
---

<blockquote class="babel-callout babel-callout-info">
  <h4>Syntax only</h4>
  <p>
    This plugin only allows Babel to parse this syntax. If you want to transform it then
    see <a href="/docs/plugins/transform-exponentiation-operator">transform-exponentiation-operator</a>.
  </p>
</blockquote>

This plugin allows Babel to parse [exponentiation operators](https://github.com/rwaldron/exponentiation-operator).

## Installation

```sh
$ npm install babel-plugin-syntax-exponentiation-operator
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["syntax-exponentiation-operator"]
}
```
