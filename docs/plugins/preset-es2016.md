---
layout: docs
title: ES2016 preset
description: All you need to compile what's in ES2016 to ES6 (for compiling to ES5 you need es2015 as well)
permalink: /docs/plugins/preset-es2016/
package: babel-preset-es2016
---

> If you need to compile ES6/ES2015, use the [es2015 preset](/docs/plugins/preset-es2015/)

This preset includes the following plugins:

- [transform-exponentiation-operator](/docs/plugins/transform-exponentiation-operator/)

## Basic Setup (with the CLI)

> For more info, check out the setup page on the [cli](/docs/setup/) and the [usage](/docs/usage/cli/) docs.

```sh
# install the cli and this preset
npm install --save-dev babel-cli babel-preset-es2016

# make a .babelrc (config file) with the preset
echo '{ "presets": ["es2016"] }' > .babelrc

# create a file to run on
echo '1 ** 2' > index.js

# run it
./node_modules/.bin/babel-node index.js
```

## Installation

```sh
$ npm install --save-dev babel-preset-es2016
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "presets": ["es2016"]
}
```

