---
id: babel-preset-react
title: "@babel/preset-react"
---

This preset always includes the following plugins:

- [@babel/plugin-syntax-jsx](plugin-syntax-jsx.md)
- [@babel/plugin-transform-react-jsx](plugin-transform-react-jsx.md)
- [@babel/plugin-transform-react-display-name](plugin-transform-react-display-name.md)

And with the `development` option:

Classic runtime adds:

- [@babel/plugin-transform-react-jsx-self](plugin-transform-react-jsx-self.md)
- [@babel/plugin-transform-react-jsx-source](plugin-transform-react-jsx-source.md)

Automatic runtime (since `v7.9.0`) adds the functionality for these plugins automatically when the `development` option is enabled. If you have automatic runtime enabled, adding [@babel/plugin-transform-react-jsx-self](plugin-transform-react-jsx-self.md) or [@babel/plugin-transform-react-jsx-source](plugin-transform-react-jsx-source.md) will error.

> Note: Flow syntax support is no longer enabled in v7. For that, you will need to add the [Flow preset](preset-flow.md).

## Installation

> You can also check out the React [Getting Started page](https://react.dev/learn/installation)

```shell npm2yarn
npm install --save-dev @babel/preset-react
```

## Usage

### With a configuration file (Recommended)

Without options:

```json title="babel.config.json"
{
  "presets": ["@babel/preset-react"]
}
```

With options:

:::babel8

```json title="babel.config.json"
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic", // defaults to automatic
        "importSource": "custom-jsx-library", // defaults to react(only in automatic runtime)
        "throwIfNamespace": false // defaults to true
        // "pragma": "dom", // default pragma is React.createElement (only in classic runtime)
        // "pragmaFrag": "DomFrag", // default is React.Fragment (only in classic runtime)
      }
    ]
  ]
}
```

:::

:::babel7

```json title="babel.config.json"
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "pragma": "dom", // default pragma is React.createElement (only in classic runtime)
        "pragmaFrag": "DomFrag", // default is React.Fragment (only in classic runtime)
        "throwIfNamespace": false, // defaults to true
        "runtime": "classic" // defaults to classic
        // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)
      }
    ]
  ]
}
```

:::

### Via CLI

```sh title="Shell"
babel --presets @babel/preset-react script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  presets: ["@babel/preset-react"],
});
```

## Options

### Both Runtimes

#### `runtime`

:::babel8

`classic | automatic`, defaults to `automatic`

:::

:::babel7

`classic | automatic`, defaults to `classic`

:::

Added in: `v7.9.0`

:::babel7

> Note: The default runtime will be switched to `automatic` in Babel 8.

:::

Decides which runtime to use.

`automatic` auto imports the functions that JSX transpiles to. `classic` does not automatic import anything.

#### `development`

:::babel7

`boolean`, defaults to `false`.

:::

:::babel8

`boolean`, defaults to `true` if Babel's [`envName`](./options.md#envname) id `"development"`, and `false` otherwise.

:::

This toggles behavior specific to development, such as adding `__source` and `__self`.

This is useful when combined with the [env option](options.md#env) configuration or [js config files](config-files.md#javascript).

#### `throwIfNamespace`

`boolean`, defaults to `true`.

Toggles whether or not to throw an error if a XML namespaced tag name is used. For example:

    <f:image />

Though the JSX spec allows this, it is disabled by default since React's JSX does not currently have support for it.

#### `pure`

`boolean`, defaults to `true`.

Enables `@babel/plugin-transform-react-pure-annotations`. It will mark top-level React method calls as pure for tree shaking.

### React Automatic Runtime

#### importSource

`string`, defaults to `react`.

Added in: `v7.9.0`

Replaces the import source when importing functions.

### React Classic Runtime

#### `pragma`

`string`, defaults to `React.createElement`.

Replace the function used when compiling JSX expressions. It should be a qualified name (e.g. `React.createElement`) or an identifier (e.g. `createElement`).

#### `pragmaFrag`

`string`, defaults to `React.Fragment`.

Replace the component used when compiling JSX fragments. It should be a valid JSX tag name.

::::babel7

#### `useBuiltIns`

`boolean`, defaults to `false`.

:::warning
This option will be removed in Babel 8. Set `useBuiltIns` to `true` if you are targeting to modern browsers.
:::

Will use the native built-in instead of trying to polyfill behavior for any plugins that require one.

#### `useSpread`

`boolean`, defaults to `false`.

Added in: `v7.7.0`

:::warning
This option will be removed in Babel 8. Set `useSpread` to `true` if you are targeting to modern browsers.
:::

When spreading props, use inline object with spread elements directly instead of Babel's extend helper or `Object.assign`.

::::

### babel.config.js

```js title="babel.config.js"
module.exports = {
  presets: [
    [
      "@babel/preset-react",
      {
        development: process.env.BABEL_ENV === "development",
      },
    ],
  ],
};
```

### babel.config.json

> Note: the `env` option will likely get deprecated soon

```json title="babel.config.json"
{
  "presets": ["@babel/preset-react"],
  "env": {
    "development": {
      "presets": [["@babel/preset-react", { "development": true }]]
    }
  }
}
```

> You can read more about configuring preset options [here](https://babeljs.io/docs/en/presets#preset-options)
