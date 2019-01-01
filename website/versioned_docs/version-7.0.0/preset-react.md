---
id: version-7.0.0-babel-preset-react
title: @babel/preset-react
sidebar_label: react
original_id: babel-preset-react
---

This preset always includes the following plugins:

- [@babel/plugin-syntax-jsx](plugin-syntax-jsx.md)
- [@babel/plugin-transform-react-jsx](plugin-transform-react-jsx.md)
- [@babel/plugin-transform-react-display-name](plugin-transform-react-display-name.md)

And with the `development` option:

- [@babel/plugin-transform-react-jsx-self](plugin-transform-react-jsx-self.md)
- [@babel/plugin-transform-react-jsx-source](plugin-transform-react-jsx-source.md)

> Note: Flow syntax support is no longer enabled in v7. For that, you will need to add the [Flow preset](preset-flow.md).

## Installation

> You can also check out the React [Getting Started page](https://facebook.github.io/react/docs/hello-world.html)

```sh
npm install --save-dev @babel/preset-react
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

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
        "pragma": "dom", // default pragma is React.createElement
        "pragmaFrag": "DomFrag", // default is React.Fragment
        "throwIfNamespace": false // defaults to true
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
require("@babel/core").transform("code", {
  presets: ["@babel/preset-react"],
});
```

## Options

### `pragma`

`string`, defaults to `React.createElement`.

Replace the function used when compiling JSX expressions.

### `pragmaFrag`

`string`, defaults to `React.Fragment`.

Replace the component used when compiling JSX fragments.

### `useBuiltIns`

`boolean`, defaults to `false`.

Will use the native built-in instead of trying to polyfill behavior for any plugins that require one.

### `development`

`boolean`, defaults to `false`.

Toggles plugins that aid in development, such as [`@babel/plugin-transform-react-jsx-self`](plugin-transform-react-jsx-self.md) and [`@babel/plugin-transform-react-jsx-source`](plugin-transform-react-jsx-source.md).

This is useful when combined with the [env option](options.md#env) configuration or [js config files](config-files.md#javascript).

### `throwIfNamespace`

`boolean`, defaults to `true`.

Toggles whether or not to throw an error if a XML namespaced tag name is used. For example:

    <f:image />

Though the JSX spec allows this, it is disabled by default since React's JSX does not currently have support for it.

#### .babelrc.js

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

#### .babelrc

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
