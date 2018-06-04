---
title: .babelrc
id: babelrc
---

Babel can be configured! Many other tools have similar configs: ESLint (`.eslintrc`), Prettier (`.prettierrc`).

All Babel API [options](core.md#options) are allowed. However if the option requires JavaScript, you may need to use a `.babelrc.js` file.

## Config types

- `.babelrc`
- `.babelrc.js`
- `package.json` key
- Tools (`@babel/core`, `@babel/register`) may take in options directly
- `@babel/cli`

## Use via `.babelrc`

```json
{
  "plugins": ["@babel/plugin-transform-arrow-functions"]
}
```

## Use via `.babelrc.js`

```json
module.exports = {
  "plugins": ["@babel/plugin-transform-arrow-functions"]
};
```

## Use via `package.json`

Alternatively, you can choose to specify your `.babelrc` config from within `package.json` like so:

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    // my babel config here
  }
}
```

## Use via `@babel/core`

```js
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"]
});
```

## Use via `@babel/cli`

```sh
babel --plugins @babel/plugin-transform-arrow-functions script.js
```

## Lookup behavior

Babel will look for a `.babelrc` in the current directory of the file being transpiled. If one does not exist, it will travel up the directory tree until it finds either a `.babelrc`, or a `package.json` with a `"babel": {}` hash within.

Use `"babelrc": false` in [options](api.md#options) to stop lookup behavior, or provide the [`--no-babelrc` CLI flag](babel-cli.md#babel-ignoring-babelrc).

## `"overrides"`

Babel takes this idea from [ESLint](http://eslint.org/docs/user-guide/configuring#example-configuration). This gives you the ability to apply a configuration to specific files.

Every config object can specify a `test`/`include`/`exclude` (like Webpack).
Each item allows an `item`, or `array of items` that can be a `string`, `RegExp`, or `function`.

"overrides" is an array of sub-configs that apply on top of the base configs that will apply based on their `test`/`include`/`exclude` values.

Example of compiling client code against browsers while the rest of the server code is compiled against node.

```json
{
  "presets": [
    ["env", { 
      "targets": { "node": "current" },
    }],
  ],
  "overrides": [{
    "test": "./client",
    "presets": [
      ["env", { 
        "targets": { "browsers": ["last 2 versions"] },
      }],
    ],
  }],
}
```

## `env` (environment) option

You can use the `env` option to set specific options when in a certain environment:

```json
{
  "env": {
    "production": {
      "plugins": ["@babel/plugin-transform-classes"]
    }
  }
}
```

Options specific to a certain environment are merged into and overwrite non-env specific options.

The `env` key will be taken from `process.env.BABEL_ENV`, when this is not available then it uses
`process.env.NODE_ENV` if even that is not available then it defaults to `"development"`.


#### `envName`

Instead of setting an environment variable, one can pass `envName` or `--env-name` explicitly.

#### Setting an environment variable

Or you can set this environment variable implicitly with the following:

**Unix**

At the start of a command:

```sh
BABEL_ENV=production YOUR_COMMAND_HERE
```

Or as a separate command:

```sh
export BABEL_ENV=production
```

```sh
YOUR_COMMAND_HERE
```

**Windows**

```sh
SET BABEL_ENV=production
```

```sh
YOUR_COMMAND_HERE
```

> If you want your command to work across platforms, you can use [`cross-env`](https://www.npmjs.com/package/cross-env)
