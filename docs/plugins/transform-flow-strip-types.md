---
layout: docs
title: Strip flow types transform
description:
permalink: /docs/plugins/transform-flow-strip-types/
package: babel-plugin-transform-flow-strip-types
---

This plugin strips all [flow](http://flowtype.org) type annotations and declarations.

<blockquote class="babel-callout babel-callout-info">
  <h4>Syntax only</h4>
  <p>
    This plugin only removes flow types. It doesn't actually check if the types are valid itself. You'll need to use flow itself or a different babel plugin.
  </p>
</blockquote>

## Example

**In**

```javascript
function foo(one: any, two: number, three?): string {}
```

**Out**

```javascript
function foo(one, two, three) {}
```

[Try in REPL](/repl/#?babili=false&evaluate=true&lineWrap=false&presets=react&code=function%20foo(one%3A%20any%2C%20two%3A%20number%2C%20three%3F)%3A%20string%20%7B%7D&experimental=false&loose=false&spec=false&playground=false&stage=0
)

## Installation

```sh
$ npm install babel-plugin-transform-flow-strip-types
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-flow-strip-types"]
}
```
