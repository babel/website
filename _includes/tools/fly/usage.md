```js
  export function* text () {
    yield this
      .source("src/**/*.js")
      .babel({ presets: ["env"] })
      .target("dist/")
  }
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/flyjs/fly-babel">flyjs/fly-babel 项目</a>。
  </p>
</blockquote>
