在你的 brunch 配置文件(例如: `brunch-config.coffee`)中设置 babel 选项，除了用于内部处理的 `filename` 和 `sourceMap` 以外。

```coffee
plugins:
  babel:
    whitelist: ["arrowFunctions"]
    format:
      semicolons: false
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/babel/babel-brunch">babel/babel-brunch 仓库</a>.
  </p>
</blockquote>

