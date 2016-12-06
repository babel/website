---
layout: docs
title: React preset
description: Strip flow types and transform JSX into createElement calls.
permalink: /docs/plugins/preset-react/
package: babel-preset-react
---

This preset includes the following plugins:

- [syntax-flow](/docs/plugins/syntax-flow/)
- [syntax-jsx](/docs/plugins/syntax-jsx/)
- [transform-flow-strip-types](/docs/plugins/transform-flow-strip-types/)
- [transform-react-jsx](/docs/plugins/transform-react-jsx/)
- [transform-react-display-name](/docs/plugins/transform-react-display-name/)

## Basic Setup (with the CLI)

> You can also check out the React [Getting Started page](https://facebook.github.io/react/docs/hello-world.html)

> For more info, check out the setup page on the [cli](/docs/setup/) and the [usage](/docs/usage/cli/) docs.

Install the CLI and this preset

```sh
npm install --save-dev babel-cli babel-preset-react
```

Make a .babelrc config file with the preset

```sh
echo '{ "presets": ["react"] }' > .babelrc
```

Create a file to run on

```sh
echo '<h1>Hello, world!</h1>' > index.js
```

View the output

```sh
./node_modules/.bin/babel index.js
```

{% include package_readme.html %}
