---
layout: docs
title: Inline environment variables transform
description:
permalink: /docs/plugins/transform-inline-environment-variables/
package: babel-plugin-transform-inline-environment-variables
---

This plugin allows Babel to transform inlines environment variables.

## Example

For example compiling the following file:

**script.js**

```javascript
if (process.env.NODE_ENV === "development") {
  development();
} else {
  production();
}
```

with the command:

```sh
$ NODE_ENV=development babel --plugins transform-inline-environment-variables script.js
```

outputs:

```javascript
if ("development" === "development") {
  development();
} else {
  production();
}
```

## Installation

```sh
$ npm install babel-plugin-transform-inline-environment-variables
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-inline-environment-variables"]
}
```
