---
layout: docs
title: Syntax flow
description:
permalink: /docs/plugins/syntax-flow/
package: babel-plugin-syntax-flow
---

<blockquote class="babel-callout babel-callout-info">
  <h4>Syntax only</h4>
  <p>
    This plugin only allows Babel to parse this syntax. If you want to transform it then
    see <a href="/docs/plugins/transform-flow-strip-types">transform-flow-strip-types</a>.
  </p>
</blockquote>

This plugin allows Babel to parse [flow syntax](http://flowtype.org/docs/quick-reference.html#_).

## Installation

```sh
$ npm install babel-plugin-syntax-flow
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["syntax-flow"]
}
```
