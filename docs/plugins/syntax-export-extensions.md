---
layout: docs
title: Syntax export extensions
description:
permalink: /docs/plugins/syntax-export-extensions/
package: babel-plugin-syntax-export-extensions
---

<blockquote class="babel-callout babel-callout-info">
  <h4>Syntax only</h4>
  <p>
    This plugin only allows Babel to parse this syntax. If you want to transform it then
    see <a href="/docs/plugins/transform-export-extensions/">export-extensions</a>.
  </p>
</blockquote>

This plugin allows Babel to parse [export extensions](https://github.com/leebyron/ecmascript-more-export-from).

## Installation

```sh
$ npm install babel-plugin-syntax-export-extensions
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["syntax-export-extensions"]
}
```
