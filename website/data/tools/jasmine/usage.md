In your `spec/support/jasmine.json` file make the following changes:

```json title="JSON"
{
  "helpers": [
    "../node_modules/@babel/register/lib/node.js"
  ]
}
```

This file is created when you setup a project with the `jasmine init` command. Note that the file paths in `helpers` option are relative to `spec_dir`, not to project root path.

Create a `babel.config.json` in your project root:

```json title="babel.config.json"
{
  "presets": ["@babel/preset-env"]
}
```

<blockquote class="alert alert--info">
  <p>
    For more information see the <a href="https://github.com/piecioshka/test-jasmine-babel">piecioshka/test-jasmine-babel repo</a>.
  </p>
</blockquote>
