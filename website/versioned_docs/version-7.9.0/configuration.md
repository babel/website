---
id: version-7.9.0-configuration
title: Configure Babel
original_id: configuration
---

Babel can be configured! Many other tools have similar configs: ESLint (`.eslintrc`), Prettier (`.prettierrc`).

All Babel API [options](options.md) are allowed. However, if the option requires JavaScript, you may want to use a JavaScript [configuration file](config-files.md).

## What's your use case?

- You are using a monorepo?
- You want to compile `node_modules`?

> [`babel.config.json`](#babelconfigjson) is for you!

- You have a configuration that only applies to a single part of your project?

> [`.babelrc.json`](#babelrcjson) is for you!

- Guy Fieri is your hero?

> We recommend using the [`babel.config.json`](config-files.md#project-wide-configuration) format. [Babel itself is using it](https://github.com/babel/babel/blob/master/babel.config.js).

### `babel.config.json`

Create a file called `babel.config.json` with the following content at the root of your project (where the `package.json` is).

```json
{
  "presets": [...],
  "plugins": [...]
}
```

```js
module.exports = function (api) {
  api.cache(true);

  const presets = [ ... ];
  const plugins = [ ... ];

  return {
    presets,
    plugins
  };
}
```

Check out the [`babel.config.json` documentation](config-files.md#project-wide-configuration) to see more configuration options.

### `.babelrc.json`

Create a file called `.babelrc.json` with the following content in your project.

```json
{
  "presets": [...],
  "plugins": [...]
}
```

Check out the [.babelrc documentation](config-files.md#file-relative-configuration) to see more configuration options.

### `package.json`

Alternatively, you can choose to specify your [`.babelrc.json`](#babelrcjson) config from within `package.json` using the `babel` key like so:

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

### JavaScript configuration files

You can also write `babel.config.json` and `.babelrc.json` files using JavaScript:

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

You can read more about JavaScript configuration files in the [dedicated documentation](config-files.md)

## Using the CLI (`@babel/cli`)

```sh
babel --plugins @babel/plugin-transform-arrow-functions script.js
```

Check out the [babel-cli documentation](cli.md) to see more configuration options.

## Using the API (`@babel/core`)

```js
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"]
});
```

Check out the [babel-core documentation](core.md) to see more configuration options.
