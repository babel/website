In your `spec/support/jasmine.json` file make the following changes:

```json
{
  "helpers": [
    "../node_modules/babel-register/lib/node.js"
  ]
}
```

This file is created when you setup a project with the `jasmine init` command.

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the <a href="https://github.com/piecioshka/test-jasmine-babel">piecioshka/test-jasmine-babel repo</a>.
  </p>
</blockquote>
