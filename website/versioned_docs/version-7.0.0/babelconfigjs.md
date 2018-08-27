---
title: babel.config.js
id: version-7.0.0-babelconfigjs
original_id: babelconfigjs
---

## Lookup behavior

The lookup behavior is direct as Babel will only look for a `babel.config.js` in the root directory (where your `package.json` is by default). If configuration is needed, see [specifying the root folder](babelconfigjs.md#specifying-the-root-folder).

## Merging behavior

Unlike other formats (see the [configuration guide](configuration.md)), Babel won't try to merge configurations.

```js
project
├── package.json
├── babel.config.js
├── node_modules
│   └── depA
│       ├── .babelrc // ignored
│       └── index.js // babel.config.js will be used
└── src
    ├── .babelrc // ignored
    └── index.js // babel.config.js will be used
```

> Note: the configuration defined in `babel.config.js` is applied to your entire project.

## Dynamic configuration

Since it's just a regular JavaScript file, you can write any arbitrary logic or use the Nodejs API:

```js
const pkg = require("./package.json");

module.exports = function () {
  const plugins = [ ... ];

  if (pkg.authors.includes("Fieri")) {
    plugins.push(...);
  }

  return { plugins };
}
```

### Environment

A conditional configuration is useful when you want to use certain plugins/presets based on the current environment, for example:

```js
module.exports = function () {
  const plugins = [ ... ];

  if (process.env["REMOVE_DEBUG"] === 1) {
    plugins.push("babel-plugin-remove-console-debug");
  }

  return { plugins };
}
```

You can invoke it using the CLI:

```sh
REMOVE_DEBUG=1 babel file.js
```

## API

Babel will pass an object as first argument, called `api` here.

```js
module.exports = function (api) {
  const babelEnv = api.env();

  return { ... };
}
```

### `api.env()`

Returns Babel's environment, you can configure it using the `BABEL_ENV` environment variable.

### `api.version`

Returns Babel's core version.

### `api.cache()`

// TODO

## Specifying the root folder

You can pass a `root` in the Babel configuration, see [@Babel/core's documentation](babel-core.md#options).

## Extending other `.babelrc`

To allow people to opt into `.babelrc` usage, potentially for local development; you can specify a list of `.babelrc` to use.

For example using `babel-loader`:

```js
test: /\.js$/,
loader: "babel-loader",
options: {
  babelrc: [
    ".",
    "../some-linked-package"
  ]
}
```
