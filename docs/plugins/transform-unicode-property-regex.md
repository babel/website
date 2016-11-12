---
layout: docs
title: Unicode property escapes transform
description:
permalink: /docs/plugins/transform-export-extensions/
package: babel-plugin-transform-export-extensions
---

This plugin allows Babel to transform [Unicode property escapes of the form `\p{…}` or `\P{…}`](https://mathiasbynens.be/notes/es-unicode-property-escapes) in regular expressions with the `u` flag.

```js
const letter = /\p{Letter}/u;
console.log(
  letter.test('π')
);
```

[Try in REPL](/repl/#?evaluate=true&presets=es2015%2Cstage-1&code=const+letter+%3D+/%5Cp%7BLetter%7D/u%3B%0Aconsole.log%28%0A++letter.test%28%27%CF%80%27%29%0A%29%3B)

## Installation

```sh
$ npm install babel-plugin-transform-unicode-property-regex
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-unicode-property-regex"]
}
```

## References

* [Summary: Unicode property escapes in regular expressions](https://mathiasbynens.be/notes/es-unicode-property-escapes)
* [ECMAScript proposal: Unicode property escapes in regular expressions](https://github.com/mathiasbynens/es-regexp-unicode-property-escapes)
* [Exhaustive list of supported Unicode property/value pairs](https://github.com/mathiasbynens/regexpu-core/blob/master/property-escapes.md)
* [Source code for this plugin](https://github.com/mathiasbynens/babel-plugin-transform-unicode-property-regex)
