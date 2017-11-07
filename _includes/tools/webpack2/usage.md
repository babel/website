#### 通过 config 方式

```js
module: {
  rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
}
```

#### 通过 loader 方式

```js
var Person = require("babel!./Person.js").default;
new Person();
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    欲了解更多信息，请查阅 <a href="https://github.com/babel/babel-loader">babel/babel-loader 项目</a>.
  </p>
</blockquote>
