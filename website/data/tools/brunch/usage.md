That's it! Set babel options in your brunch config (such as `brunch-config.coffee`) except
for `filename` and `sourceMap` which are handled internally.

```coffee
plugins:
  babel:
    whitelist: ["arrowFunctions"]
    format:
      semicolons: false
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the <a href="https://github.com/babel/babel-brunch">babel/babel-brunch repo</a>.
  </p>
</blockquote>

