---
layout: docs
title: Latest preset
description: All you need to compile what's in ES2015+
permalink: /docs/plugins/preset-latest/
package: babel-preset-latest
---

This is a special preset that will contain all yearly presets so user's won't need to specify each one individually.

It currently includes:

- [es2017](/docs/plugins/preset-es2017/)
- [es2016](/docs/plugins/preset-es2016/)
- [es2015](/docs/plugins/preset-es2015/)

## Basic Setup (with the CLI)

> For more info, check out the setup page on the [cli](/docs/setup/) and the [usage](/docs/usage/cli/) docs.

```sh
# install the cli and this preset
npm install --save-dev babel-cli babel-preset-latest

# make a .babelrc (config file) with the preset
echo '{ "presets": ["latest"] }' > .babelrc

# create a file to run on
echo '1 ** 2' > index.js

# run it
./node_modules/.bin/babel-node index.js
```

## Installation

```sh
$ npm install --save-dev babel-preset-latest
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "presets": ["latest"]
}
```

### Options

You can also pass options down to the `es2015` preset.

```js
{ "presets": [
  ["latest", {
    "es2015": {
      "modules": false 
    }
  }]
] }
```
