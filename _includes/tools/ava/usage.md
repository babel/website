AVA comes with built-in support for Babel 6 and let you write your tests
in ES2015 with no extra effort.

You can customize Babel options for transpiling test files with the
`babel` option in AVA's [`package.json` configuration](https://github.com/sindresorhus/ava#configuration).

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
or you can simply `"inherit"` the Babel configuration from
[`.babelrc`](/docs/usage/babelrc/) or Babel's
[`package.json` configuration](/docs/usage/babelrc/) making test files
use the same configuration as your source files like this:

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
