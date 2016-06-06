---
layout: docs
title: ES2015 preset
description: All you need to compile ES2015 to ES5
permalink: /docs/plugins/preset-es2015/
package: babel-preset-es2015
---

This preset includes the following plugins:

- [check-es2015-constants](/docs/plugins/check-es2015-constants)
- [transform-es2015-arrow-functions](/docs/plugins/transform-es2015-arrow-functions)
- [transform-es2015-block-scoped-functions](/docs/plugins/transform-es2015-block-scoped-functions)
- [transform-es2015-block-scoping](/docs/plugins/transform-es2015-block-scoping)
- [transform-es2015-classes](/docs/plugins/transform-es2015-classes)
- [transform-es2015-computed-properties](/docs/plugins/transform-es2015-computed-properties)
- [transform-es2015-destructuring](/docs/plugins/transform-es2015-destructuring)
- [transform-es2015-duplicate-keys](/docs/plugins/transform-es2015-duplicate-keys) 
- [transform-es2015-for-of](/docs/plugins/transform-es2015-for-of)
- [transform-es2015-function-name](/docs/plugins/transform-es2015-function-name)
- [transform-es2015-literals](/docs/plugins/transform-es2015-literals)
- [transform-es2015-modules-commonjs](/docs/plugins/transform-es2015-modules-commonjs)
- [transform-es2015-object-super](/docs/plugins/transform-es2015-object-super)
- [transform-es2015-parameters](/docs/plugins/transform-es2015-parameters)
- [transform-es2015-shorthand-properties](/docs/plugins/transform-es2015-shorthand-properties)
- [transform-es2015-spread](/docs/plugins/transform-es2015-spread)
- [transform-es2015-sticky-regex](/docs/plugins/transform-es2015-sticky-regex)
- [transform-es2015-template-literals](/docs/plugins/transform-es2015-template-literals)
- [transform-es2015-typeof-symbol](/docs/plugins/transform-es2015-typeof-symbol)
- [transform-es2015-unicode-regex](/docs/plugins/transform-es2015-unicode-regex)
- [transform-regenerator](/docs/plugins/transform-regenerator)

## Basic Setup (with the CLI)

> For more info, check out the setup page on the [cli](docs/setup) and the [usage](docs/usage/cli/) docs.

```sh
# install the cli and this preset
npm install --save-dev babel-cli babel-preset-es2015

# make a .babelrc (config file) with the preset
echo '{ "presets": ["es2015"] }' > .babelrc

# create a file to run on
echo 'console.log([1, 2, 3].map(n => n + 1));' > index.js

# run it
./node_modules/.bin/babel-node index.js
```

## Installation

```sh
$ npm install --save-dev babel-preset-es2015
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "presets": ["es2015"]
}
```

