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

Install the CLI and this preset

```sh
npm install --save-dev babel-cli babel-preset-latest
```

Make a .babelrc config file with the preset

```sh
echo '{ "presets": ["latest"] }' > .babelrc
```

Create a file to run on

```sh
echo 'console.log(1 ** 2)' > index.js
```

Run it

```sh
./node_modules/.bin/babel-node index.js
```

{% include package_readme.html %}
