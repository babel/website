---
id: configuration
title: Configure Babel
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

> We recommend using the [`babel.config.json`](config-files.md#project-wide-configuration) format. [Babel itself is using it](https://github.com/babel/babel/blob/main/babel.config.js).

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
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"],
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
    "@foo/babel-plugin-1"
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

For each config source, Babel prints applicable config items (e.g. [`overrides`](options.md#overrides) and [`env`](options.md#env)) in the order of ascending priority. Generally each config sources has at least one config item -- the root content of configs. If you have configured `overrides` or `env`, Babel will not print them in the root, but will instead output a separate config item titled as `.overrides[index]`, where `index` is the position of the item. This helps determine whether the item is effective on the input and which configs it will override.

If your input is ignored by `ignore` or `only`, Babel will print that this file is ignored.

### How Babel merges config items

Babel's configuration merging is relatively straightforward. Options will overwrite existing options
when they are present and their value is not `undefined`. There are, however, a few special cases:

- For `assumptions`, `parserOpts` and `generatorOpts`, objects are merged, rather than replaced.
- For `plugins` and `presets`, they are replaced based on the identity of the plugin/preset object/function itself combined with the name of the entry.

#### Option (except plugin/preset) merging

As an example, consider a config with:

```js
{
  sourceType: "script",
  assumptions: {
    setClassFields: true,
    iterableIsArray: false
  },
  env: {
    test: {
      sourceType: "module",
      assumptions: {
        iterableIsArray: true,
      },
    }
  }
};
```

When `NODE_ENV` is `test`, the `sourceType` option will be replaced and the `assumptions` option will be merged. The effective config is:

```js
{
  sourceType: "module", // sourceType: "script" is overwritten
  assumptions: {
    setClassFields: true,
    iterableIsArray: true, // assumptions are merged by Object.assign
  },
}
```

#### Plugin/Preset merging

As an example, consider a config with:

```js
plugins: [
  './other',
  ['./plug', { thing: true, field1: true }]
],
overrides: [{
  plugins: [
    ['./plug', { thing: false, field2: true }],
  ]
}]
```

The `overrides` item will be merged on top of the top-level options. Importantly, the `plugins`
array as a whole doesn't just replace the top-level one. The merging logic will see that `"./plug"`
is the same plugin in both cases, and `{ thing: false, field2: true }` will replace the original
options, resulting in a config as

```js
plugins: [
  './other',
  ['./plug', { thing: false, field2: true }],
],
```

Since merging is based on identity + name, it is considered an error to use the same plugin with
the same name twice in the same `plugins`/`presets` array. For example

```js
plugins: ["./plug", "./plug"];
```

is considered an error, because it's identical to `plugins: ['./plug']`. Additionally, even

```js
plugins: [["./plug", { one: true }], ["./plug", { two: true }]];
```

is considered an error, because the second one would just always replace the first one.

If you actually _do_ want to instantiate two separate instances of a plugin, you must assign each one
a name to disambiguate them. For example:

```js
plugins: [
  ["./plug", { one: true }, "first-instance-name"],
  ["./plug", { two: true }, "second-instance-name"],
];
```

because each instance has been given a unique name and thus a unique identity.
