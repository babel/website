---
layout: docs
title: Strip flow types transform
description:
permalink: /docs/plugins/transform-flow-strip-types/
package: babel-plugin-transform-flow-strip-types
---

This plugin strips all [flow](http://flowtype.org) type annotations and declarations.

## Example

**In**

```javascript
function foo(one: any, two: number, three?): string {}
```

**Out**

```javascript
function foo(one, two, three) {}
```

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
