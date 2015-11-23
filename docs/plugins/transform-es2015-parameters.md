---
layout: docs
title: ES2015 parameters transform
description:
permalink: /docs/plugins/transform-es2015-parameters/
package: babel-plugin-transform-es2015-parameters
---

This plugin transforms ES2015 parameters to ES5, this includes:

 - Destructuring parameters
 - Default parameters
 - Rest parameters

## Caveats

Default parameters desugar into `let` declarations to retain proper semantics. If this is
not supported in your environment then you'll need the
[transform-block-scoping](/docs/plugins/transform-es2015-block-scoping) plugin.

## Installation

```sh
$ npm install babel-plugin-transform-es2015-parameters
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-es2015-parameters"]
}
```
