---
layout: docs
title: Undefined to void transform
description:
permalink: /docs/plugins/transform-undefined-to-void/
package: babel-plugin-transform-undefined-to-void
---

Some JavaScript implementations allow undefined to be overwritten, this may lead to peculiar bugs that are extremely hard to track down.

This plugin transforms `undefined` into `void 0` which returns undefined regardless of if it's been reassigned.

## Example

**In**

```javascript
foo === undefined;
```

**Out**

```javascript
foo === void 0;
```

## Installation

```sh
$ npm install babel-plugin-transform-undefined-to-void
```

## Usage

Add the following line to your `.babelrc`:

```json
{
  "plugins": ["transform-undefined-to-void"]
}
```
