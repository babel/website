AVA ships with ES2015 support built-in using Babel 6 under the hood, so
you can write test using ES2015 syntax right away.

The AVA default Babel configuration includes the `"es2015"` and `"stage-2"`
presets, but you can customize any Babel option for transpiling test files
with the `"babel"` option in AVA's
[`package.json` configuration](https://github.com/sindresorhus/ava#configuration).

For example:

```json
{
  "ava": {
    "babel": {
      "presets": [
        "es2015",
        "react"
      ]
    }
  }
}
```

Or you can simply `"inherit"` the Babel configuration from
[`.babelrc`](/docs/usage/babelrc/) or Babel's
[`package.json` configuration](/docs/usage/babelrc/), making test files
use the same configuration as your source files:

```json
{
  "ava": {
    "babel": "inherit"
  }
}
```

Note that AVA _always_ adds a few custom Babel plugins when transpiling
your plugins see <a href="https://github.com/sindresorhus/ava/blob/master/docs/recipes/babelrc.md#notes">notes</a>.

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the AVA recipe on <a
    href="https://github.com/sindresorhus/ava/blob/master/docs/recipes/babelrc.md">
    how to configure</a> Babel.
  </p>
</blockquote>
