---
layout: docs
title: Minify booleans transform
description:
permalink: /docs/plugins/transform-minify-booleans/
package: babel-plugin-transform-minify-booleans
---

This plugin allows Babel to transform boolean literals into `!0` for `true` and `!1` for `false`.

## Example

**In**

```javascript
true;
false;
```

**Out**

```javascript
!0;
!1;
```

## Installation

```sh
$ npm install babel-plugin-transform-minify-booleans
```

## Usage

Add the following line to your `.babelrc`:

```json
{
  "plugins": ["transform-minify-booleans"]
}
```
