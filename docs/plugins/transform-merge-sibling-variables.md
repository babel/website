---
layout: docs
title: Merge sibling variables transform
description:
permalink: /docs/plugins/transform-merge-sibling-variables/
---

Merge sibling variable declarations.

## Example

**In**

```javascript
var foo = "bar";
var bar = "foo";
```

**Out**

```javascript
var foo = "bar",
    bar = "foo";
```

## Installation

```sh
$ npm install babel-plugin-transform-merge-sibling-variables
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-merge-sibling-variables"]
}
```
