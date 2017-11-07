在配置中添加以下路径:

```js
paths: {
  es6: "node_modules/requirejs-babel/es6",
  babel: "node_modules/requirejs-babel/babel-4.6.6.min"
}
```

接下来，通过 `es6!` 加插件名引用文件:

```js
define(["es6!your-es6-module"], function (module) {
  // ...
});
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/mikach/requirejs-babel">mikach/requirejs-babel 项目</a>.
  </p>
</blockquote>
