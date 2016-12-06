---
layout: docs
title: ES2017 preset
description: Only compiles what's in ES2017 to ES2016
permalink: /docs/plugins/preset-es2017/
package: babel-preset-es2017
---

> If you want to stay up to date, use the [latest preset](/docs/plugins/preset-latest/)

This preset includes the following plugins:

- [syntax-trailing-function-commas](/docs/plugins/syntax-trailing-function-commas/)
- [transform-async-to-generator](/docs/plugins/transform-async-to-generator/)

## Basic Setup (with the CLI)

> For more info, check out the setup page on the [cli](/docs/setup/) and the [usage](/docs/usage/cli/) docs.

Install the CLI and this preset

```sh
npm install --save-dev babel-cli babel-preset-es2017
```

Make a .babelrc config file with the preset

```sh
echo '{ "presets": ["es2017"] }' > .babelrc
```

Create a file to run on

```sh
echo 'function a(b,) { console.log("hi"); }; a()' > index.js
```

Run it

```sh
./node_modules/.bin/babel-node index.js
```

{% include package_readme.html %}


