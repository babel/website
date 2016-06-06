---
layout: docs
title: Remove console transform
description:
permalink: /docs/plugins/transform-remove-console/
package: babel-plugin-transform-remove-console
---

This plugin removes all `console.*` calls.

## Example

**In**

```javascript
console.log("foo");
console.error("bar");
```

**Out**

```javascript
```

## Installation

```sh
$ npm install babel-plugin-transform-remove-console
```

## Usage

Add the following line to your `.babelrc`:

```json
{
  "plugins": ["transform-remove-console"]
}
```
