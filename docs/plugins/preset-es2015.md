---
layout: docs
title: ES2015 preset
description: Only compiles ES2015 to ES5
permalink: /docs/plugins/preset-es2015/
package: babel-preset-es2015
---

> If you want to stay up to date, use the [latest preset](/docs/plugins/preset-latest/)

This preset includes the following plugins:

- [check-es2015-constants](/docs/plugins/check-es2015-constants/)
- [transform-es2015-arrow-functions](/docs/plugins/transform-es2015-arrow-functions/)
- [transform-es2015-block-scoped-functions](/docs/plugins/transform-es2015-block-scoped-functions/)
- [transform-es2015-block-scoping](/docs/plugins/transform-es2015-block-scoping/)
- [transform-es2015-classes](/docs/plugins/transform-es2015-classes/)
- [transform-es2015-computed-properties](/docs/plugins/transform-es2015-computed-properties/)
- [transform-es2015-destructuring](/docs/plugins/transform-es2015-destructuring/)
- [transform-es2015-duplicate-keys](/docs/plugins/transform-es2015-duplicate-keys)/ 
- [transform-es2015-for-of](/docs/plugins/transform-es2015-for-of/)
- [transform-es2015-function-name](/docs/plugins/transform-es2015-function-name/)
- [transform-es2015-literals](/docs/plugins/transform-es2015-literals/)
- [transform-es2015-modules-commonjs](/docs/plugins/transform-es2015-modules-commonjs/)
- [transform-es2015-object-super](/docs/plugins/transform-es2015-object-super/)
- [transform-es2015-parameters](/docs/plugins/transform-es2015-parameters/)
- [transform-es2015-shorthand-properties](/docs/plugins/transform-es2015-shorthand-properties/)
- [transform-es2015-spread](/docs/plugins/transform-es2015-spread/)
- [transform-es2015-sticky-regex](/docs/plugins/transform-es2015-sticky-regex/)
- [transform-es2015-template-literals](/docs/plugins/transform-es2015-template-literals/)
- [transform-es2015-typeof-symbol](/docs/plugins/transform-es2015-typeof-symbol/)
- [transform-es2015-unicode-regex](/docs/plugins/transform-es2015-unicode-regex/)
- [transform-regenerator](/docs/plugins/transform-regenerator/)

## Basic Setup (with the CLI)

> You can also check out the React [Getting Started page](https://facebook.github.io/react/docs/hello-world.html)

> For more info, check out the setup page on the [cli](/docs/setup/) and the [usage](/docs/usage/cli/) docs.

Install the CLI and this preset

```sh
npm install --save-dev babel-cli babel-preset-es2015
```

Make a .babelrc config file with the preset

```sh
echo '{ "presets": ["es2015"] }' > .babelrc
```

Create a file to run on

```sh
echo 'console.log([1, 2, 3].map(n => n + 1))' > index.js
```

Run it

```sh
./node_modules/.bin/babel index.js
```

{% include package_readme.html %}
