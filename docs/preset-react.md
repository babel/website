---
id: babel-preset-react
title: @babel/preset-react
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

> You can also check out the React [Getting Started page](https://facebook.github.io/react/docs/hello-world.html)

```sh
npm install --save-dev @babel/preset-react
```

## Usage

### With a configuration file (Recommended)

Without options:

```json
{
  "presets": ["@babel/preset-react"]
}
```

With options:

```json
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

### Via CLI

```sh
babel --presets @babel/preset-react script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  presets: ["@babel/preset-react"],
});
```

## Options

### Both Runtimes

#### `runtime`

`classic | automatic`, defaults to `classic`

Added in: `v7.9.0`

Decides which runtime to use.

`automatic` auto imports the functions that JSX transpiles to. `classic` does not automatic import anything.

#### `development`

`boolean`, defaults to `false`.

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

Replace the function used when compiling JSX expressions.

#### `pragmaFrag`

`string`, defaults to `React.Fragment`.

Replace the component used when compiling JSX fragments.

#### `useBuiltIns`

`boolean`, defaults to `false`.

Will use the native built-in instead of trying to polyfill behavior for any plugins that require one.

#### `useSpread`

`boolean`, defaults to `false`.

Added in: `v7.7.0`

When spreading props, use inline object with spread elements directly instead of Babel's extend helper or `Object.assign`.

### .babelrc.js

```js
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

### .babelrc

> Note: the `env` option will likely get deprecated soon

```json
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
