---
layout: docs
title: React preset
description: Strip flow types and transform JSX into createElement calls.
permalink: /docs/plugins/preset-react/
package: babel-preset-react
---

This preset includes the following plugins:

- [syntax-flow](/docs/plugins/syntax-flow)
- [syntax-jsx](/docs/plugins/syntax-jsx)
- [transform-flow-strip-types](/docs/plugins/transform-flow-strip-types)
- [transform-react-jsx](/docs/plugins/transform-react-jsx)
- [transform-react-display-name](/docs/plugins/transform-react-display-name)

## Installation

```sh
$ npm install babel-preset-react
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "presets": ["react"]
}
```
