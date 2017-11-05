```js
var babelMiddleware = require("babel-connect");

app.use(babelMiddleware({
  options: {
    // 转译文件使用到的选项
  },
  src: "assets",
  dest: "cache"
}));

app.use(connect.static("cache"));
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/babel/babel-connect">babel/babel-connect 项目</a>。
  </p>
</blockquote>

