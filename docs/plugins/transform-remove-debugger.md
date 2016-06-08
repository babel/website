---
layout: docs
title: Remove debugger transform
description:
permalink: /docs/plugins/transform-remove-debugger/
package: babel-plugin-transform-remove-debugger
---

This plugin removes all `debugger;` statements.

## Example

**In**

```javascript
debugger;
```

**Out**

```javascript
```

## Installation

```sh
$ npm install babel-plugin-transform-remove-debugger
```

## Usage

Add the following line to your `.babelrc`:

```json
{
  "plugins": ["transform-remove-debugger"]
}
```
