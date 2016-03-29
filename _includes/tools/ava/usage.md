AVA ships with ES2015 support built-in using Babel 6 under the hood, so
you can write test using ES2015 syntax right away.

The AVA default Babel configuration includes the `"es2015"` and `"stage-2"`
presets and the `"espower"` and `"transform-runtime"` plugins, corresponing to:

```json
{
  "presets": [
    "es2015",
    "stage-2",
  ],
  "plugins": [
    "espower",
    "transform-runtime"
  ]
}
```
But you can customize any Babel option for transpiling test files with the
`"babel"` option in AVA's
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
  },
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
  },
}
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the AVA documentation on how to
    <a href="https://github.com/sindresorhus/ava#es2015-support">write
    test in ES2015</a>.
  </p>
</blockquote>
