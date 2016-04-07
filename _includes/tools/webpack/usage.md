#### Via config

```js
module: {
  loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
}
```

#### Via loader

```js
var Person = require("babel!./Person.js").default;
new Person();
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the <a href="https://github.com/babel/babel-loader">babel/babel-loader repo</a>.
  </p>
</blockquote>
