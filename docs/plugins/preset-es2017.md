---
layout: docs
title: ES2017 preset
description: All you need to compile what's in ES2017 to ES5
permalink: /docs/plugins/preset-es2017/
package: babel-preset-es2017
---

> If you need to compile ES6/ES2015, use the [es2015 preset](/docs/plugins/preset-es2015/)

This preset includes the following plugins:

- [syntax-trailing-function-commas](/docs/plugins/syntax-trailing-function-commas)
- [transform-async-to-generator](/docs/plugins/transform-async-to-generator)

## Basic Setup (with the CLI)

> For more info, check out the setup page on the [cli](/docs/setup/) and the [usage](/docs/usage/cli/) docs.

```sh
# install the cli and this preset
npm install --save-dev babel-cli babel-preset-es2017

# make a .babelrc (config file) with the preset
echo '{ "presets": ["es2017"] }' > .babelrc

# create a file to run on
echo '1 ** 2' > index.js

# run it
./node_modules/.bin/babel-node index.js
```

## Installation

```sh
$ npm install --save-dev babel-preset-es2017
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "presets": ["es2017"]
}
```

