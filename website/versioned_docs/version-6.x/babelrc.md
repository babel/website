---
title: .babelrc
id: version-6.x-babelrc
original_id: babelrc
---

All Babel API [options](api.md) except the callbacks are allowed (because `.babelrc` files are serialized as [JSON5](https://github.com/json5/json5)).

**Example:**

```json
{
  "plugins": ["transform-react-jsx"],
  "ignore": [
    "foo.js",
    "bar/**/*.js"
  ]
}
```

## Use via `package.json`

You can alternatively choose to specify your `.babelrc` config from within `package.json` like so:

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    // my babel config here
  }
}
```

## `env` option

You can use the `env` option to set specific options when in a certain environment:

```json
{
  "env": {
    "production": {
      "plugins": ["transform-react-constant-elements"]
    }
  }
}
```

Options specific to a certain environment are merged into and overwrite non-env specific options.

The `env` key will be taken from `process.env.BABEL_ENV`, when this is not available then it uses
`process.env.NODE_ENV` if even that is not available then it defaults to `"development"`.

You can set this environment variable with the following:

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

## Lookup behavior

Babel will look for a `.babelrc` in the current directory of the file being transpiled. If one does not exist, it will travel up the directory tree until it finds either a `.babelrc`, or a `package.json` with a `"babel": {}` hash within.

Use `"babelrc": false` in [options](api.md#options) to stop lookup behavior, or provide the [`--no-babelrc` CLI flag](babel-cli.md#babel-ignoring-babelrc).
