---
layout: docs
title: ES2015 constants check
description:
permalink: /docs/plugins/check-es2015-constants/
package: babel-plugin-check-es2015-constants
redirect_from:
 - /docs/plugins/transform-es2015-constants/
---

Validate ES2015 constants

<blockquote class="babel-callout babel-callout-info">
  <h4>Syntax only</h4>
  <p>
    This check will only validate consts. If you need it to compile down to `var` then you must also install and enable <a href="/docs/plugins/transform-es2015-block-scoping">transform-es2015-block-scoping</a>.
  </p>
</blockquote>

## Installation

```sh
$ npm install babel-plugin-check-es2015-constants
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["check-es2015-constants"]
}
```
