---
layout: docs
title: Syntax object rest spread
description:
permalink: /docs/plugins/syntax-object-rest-spread/
package: babel-plugin-syntax-object-rest-spread
---


<blockquote class="babel-callout babel-callout-info">
  <h4>Syntax only</h4>
  <p>
    This plugin only allows Babel to parse this syntax. If you want to transform it then
    see <a href="/docs/plugins/transform-object-rest-spread">transform-object-rest-spread</a>.
  </p>
</blockquote>

This plugin allows Babel to parse [object rest spread syntax](https://github.com/sebmarkbage/ecmascript-rest-spread).

## Installation

```sh
$ npm install babel-plugin-syntax-object-rest-spread
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["syntax-object-rest-spread"]
}
```
