---
layout: docs
title: ES2016 preset
description: Only compiles what's in ES2016 to ES2015
permalink: /docs/plugins/preset-es2016/
package: babel-preset-es2016
---

> If you want to stay up to date, use the [env preset](/docs/plugins/preset-env/)

This preset includes the following plugins:

- [transform-exponentiation-operator](/docs/plugins/transform-exponentiation-operator/)

## Basic Setup (with the CLI)

> For more info, check out the setup page on the [cli](/docs/setup/) and the [usage](/docs/usage/cli/) docs.

Install the CLI and this preset

```sh
npm install --save-dev babel-cli babel-preset-es2016
```

Make a .babelrc config file with the preset

```sh
echo '{ "presets": ["es2016"] }' > .babelrc
```

Create a file to run on

```sh
echo 'console.log(2 ** 3)' > index.js
```

Run it

```sh
./node_modules/.bin/babel-node index.js
```

{% include package_readme.html %}
