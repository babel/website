---
layout: docs
title: Member expression literals transform
description:
permalink: /docs/plugins/transform-member-expression-literals/
---

Turn member expression valid identifier literal properties into identifiers.

## Example

**In**

```javascript
foo["bar"];
```

**Out**

```javascript
foo.bar;
```

## Installation

```sh
$ npm install babel-plugin-transform-member-expression-literals
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-member-expression-literals"]
}
```
