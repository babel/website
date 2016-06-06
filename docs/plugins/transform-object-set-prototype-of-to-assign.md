---
layout: docs
title: Object set prototype of to assign transform
description:
permalink: /docs/plugins/transform-object-set-prototype-of-to-assign/
package: babel-plugin-transform-object-set-prototype-of-to-assign
---

The `object-set-prototype-of-to-assign` plugin will transform all `Object.setPrototypeOf` calls to a method that will do a shallow defaults of all properties.

**NOTE:** There are some caveats when using this plugin, see the [`babel-plugin-transform-proto-to-assign` README](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-proto-to-assign) for more information..

## Example

**In**

```javascript
Object.setPrototypeOf(bar, foo);
```

**Out**

```javascript
var _defaults = ...;

_defaults(bar, foo);
```

## Installation

```sh
$ npm install babel-plugin-transform-object-set-prototype-of-to-assign
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-object-set-prototype-of-to-assign"]
}
```
