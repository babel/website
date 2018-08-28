---
id: version-7.0.0-configuration
title: Configure Babel
original_id: configuration
---

Babel can be configured! Many other tools have similar configs: ESLint (`.eslintrc`), Prettier (`.prettierrc`).

All Babel API [options](core.md#options) are allowed. However if the option requires JavaScript, you may need to use a `.babelrc.js` file.

## What's your use case?

- You want to programmatically create the configuration?
- You want to compile `node_modules`?

> [`babel.config.js`](#babelconfigjs) is for you!

- You have a static configuration?

> [`.babelrc`](#babelrc) is for you!

- The Guy Fieri is your hero?

> We recommend to use the [`babel.config.js`](#babelconfigjs) format. [Babel itself is using it](https://github.com/babel/babel/blob/master/babel.config.js).

## `babel.config.js`

Create a file called `babel.config.js` with the following content at the root of your project (where the `package.json` is).

```js
module.exports = function () {
  const presets = [ ... ];
  const plugins = [ ... ];

  return {
    presets,
    plugins
  };
}
```

Checkout the [`babel.config.js` documentation](babelconfigjs.md) to see more configuration options.

## `.babelrc`

Create a file called `.babelrc` with the following content in your project.

```json
{
  "presets": [...],
  "plugins": [...]
}
```

Checkout the [.babelrc documentation](babelrc.md) to see more configuration options.

### `package.json`

Alternatively, you can choose to specify your [`.babelrc`](#babelrc) config from within `package.json` using the `babel` key like so:

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    "presets": [ ... ],
    "plugins": [ ... ],
  }
}
```

### `.babelrc.js`

The configuration is the same than [`.babelrc`](#babelrc), apart than you can write it using JavaScript.

```js
const presets = [ ... ];
const plugins = [ ... ];

module.exports = { presets, plugins };
```

You are allowed to access any Node.js APIs, for example a dynamic configuration based on the process environment:

```js
const presets = [ ... ];
const plugins = [ ... ];

if (process.env["ENV"] === "prod") {
  plugins.push(...);
}

module.exports = { presets, plugins };
```

## Using the CLI (`@babel/cli`)

```sh
babel --plugins @babel/plugin-transform-arrow-functions script.js
```

Checkout the [babel-cli documentation](babel-cli.md) to see more configuration options.

## Using the API (`@babel/core`)

```js
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"]
});
```

Checkout the [babel-core documentation](babel-core.md) to see more configuration options.
