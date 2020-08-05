---
id: version-7.11.0-configuration
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

## Print effective configs

You can tell Babel to print effective configs on a given input path
```sh
# *nix or WSL
BABEL_SHOW_CONFIG_FOR=./src/myComponent.jsx npm start
```

```powershell
$env:BABEL_SHOW_CONFIG_FOR = ".\src\myComponent.jsx"; npm start
```

`BABEL_SHOW_CONFIG_FOR` accepts both absolute and relative _file_ paths. If it is a relative path, it will be resolved from [`cwd`](options.md#cwd).

Once Babel processes the input file specified by `BABEL_SHOW_CONFIG_FOR`, Babel will print effective configs to the console. Here is an example output:

```
Babel configs on "/path/to/cwd/src/index.js" (ascending priority):
config /path/to/cwd/babel.config.json
{
  "sourceType": "script",
  "plugins": [
    "@foo/babel-plugin-1
  ],
  "extends": "./my-extended.js"
}

config /path/to/cwd/babel.config.json .env["test"]
{
  "plugins": [
    [
      "@foo/babel-plugin-3",
      {
        "noDocumentAll": true
      },
    ]
  ]
}

config /path/to/cwd/babel.config.json .overrides[0]
{
  "test": "src/index.js",
  "sourceMaps": true
}

config /path/to/cwd/.babelrc
{}

programmatic options from @babel/cli
{
  "sourceFileName": "./src/index.js",
  "presets": [
    "@babel/preset-env"
  ],
  "configFile": "./my-config.js",
  "caller": {
    "name": "@babel/cli"
  },
  "filename": "./src/index.js"
}
```

Babel will print effective config sources ordered by ascending priority. Using the example above, the priority is:

```
babel.config.json < .babelrc < programmatic options from @babel/cli
```
In other words, `babel.config.json` is overwritten by `.babelrc`, and `.babelrc` is overwritten by programmatic options.

For each config source, Babel prints applicable config items (e.g. [`overrides`](options.md#overrides) and [`.env`](options.md#env)) in the order of ascending priority. Generally each config sources has at least one config item -- the root content of configs. If you have configured `overrides` or `env`, Babel will not print them in the root, but will instead output a separate config item titled as `.overrides[index]`, where `index` is the position of the item. This helps determine whether the item is effective on the input and which configs it will override.

If your input is ignored by `ignore` or `only`, Babel will print that this file is ignored.

### How Babel merges config items

For each config items mentioned above, Babel applies `Object.assign` on options except for `plugins` and `presets`, which is concatenated by `Array#concat`. For example
```js
const config = {
  plugins: [["plugin-1a", { loose: true }], "plugin-1b"],
  presets: ["preset-1a"],
  sourceType: "script"
}

const newConfigItem = {
  plugins: [["plugin-1a", { loose: false }], "plugin-2b"],
  presets: ["preset-1a", "preset-2a"],
  sourceType: "module"
}

BabelConfigMerge(config, newConfigItem);
// returns
({
  plugins: [
    ["plugin-1a", { loose: false }],
    "plugin-1b",
    ["plugin-1a", { loose: false }],
    "plugin-2b"
  ], // new plugins are pushed
  presets: [
    "preset-1a",
    "preset-1a",
    "preset-2b"
  ], // new presets are pushed
  sourceType: "module" // sourceType: "script" is overwritten
})
```
