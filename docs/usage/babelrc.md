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
  "stage": 1,
  "loose": ["es6.modules", "es6.classes"],
  "ignore": [
    "foo.js",
    "bar/**/*.js"
  ]
}
```

## `env` option

You can use the `env` option to set specific options when in a certain environment:

```json
{
  "env": {
    "production": {
      "optional": ["optimisation", "minification"]
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
