---
layout: docs
title: Object.assign transform
description:
permalink: /docs/plugins/transform-object-assign/
package: babel-plugin-transform-object-assign
---

Replace `Object.assign` with an inline helper.

## Example

**In**

```javascript
Object.assign(a, b);
```

**Out**

```javascript
var _extends = ...;

_extends(a, b);
```

## Installation

```sh
$ npm install babel-plugin-transform-object-assign
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-object-assign"]
}
```
## Example
In
```
Object.assign(a, b);
```
Out
```
var _extends = ...;
_extends(a, b);
```
