---
layout: docs
title: babelrc
description: How to use the babelrc
permalink: /docs/usage/babelrc/
---

The entire range of Babel API [options](/docs/usage/options) are allowed.

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

```javascript
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

The `env` key will be taken from `process.env.BABEL_ENV`, when this is not available then it uses
`process.env.NODE_ENV` if even that is not available then it defaults to `"development"`.

You can set this environment variable with the following:

**Unix**

```sh
# at the start of a command
$ BABEL_ENV=production YOUR_COMMAND_HERE

# or as a separate command
$ NODE_ENV=production
$ YOUR_COMMAND_HERE
```

**Windows**

```sh
$ SET BABEL_ENV=production
$ YOUR_COMMAND_HERE
```

## Lookup behavior

Babel will look for a `.babelrc` in the current directory of the file being transpiled. If one does not exist, it will travel up the directory tree until it finds either a `.babelrc`, or a `package.json` with a `"babel": {}` hash within.
