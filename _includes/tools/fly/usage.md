```js
  export function* text () {
    yield this
      .source("src/**/*.js")
      .babel({ presets: ["es2015"] })
      .target("dist/")
  }
```
<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the <a href="https://github.com/bucaran/fly-babel">bucaran/fly-babel repo</a>.
  </p>
</blockquote>
