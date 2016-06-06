---
layout: docs
title: Export extensions transform
description:
permalink: /docs/plugins/transform-export-extensions/
package: babel-plugin-transform-export-extensions
---

This plugin allows Babel to transform additional export-from statements.

```js
export * as ns from 'mod';
export v from 'mod';
```
[Try in REPL](/repl/#?evaluate=true&presets=es2015%2Cstage-0&code=export%20*%20as%20ns%20from%20'mod'%3B%0Aexport%20v%20from%20'mod'%3B)

## Installation

```sh
$ npm install babel-plugin-transform-export-extensions
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-export-extensions"]
}
```

## References

* ~~[Proposal: Additional export-from statements in ES7](https://github.com/leebyron/ecmascript-more-export-from)~~ (Withdrawn)
* [ECMAScript Proposal: export ns from](https://github.com/leebyron/ecmascript-export-ns-from)
* [ECMAScript Proposal: export default from](https://github.com/leebyron/ecmascript-export-default-from)
