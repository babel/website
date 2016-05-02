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

## Basic Setup (with the CLI)

> For more info, check out the setup page on the [cli](docs/setup) and the [usage](docs/usage/cli/) docs.
> You can also check out the React [Getting Started page](https://facebook.github.io/react/docs/getting-started.html)

```sh
# install the cli and this preset
npm install --save-dev babel-cli babel-preset-react

# make a .babelrc (config file) with the preset
echo '{ "presets": ["react"] }' > .babelrc

# create a file to run on
echo '<h1>Hello, world!</h1>' > index.js

# view output
./node_modules/.bin/babel index.js
```

## Installation

```sh
$ npm install --save-dev babel-preset-react
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "presets": ["react"]
}
```
