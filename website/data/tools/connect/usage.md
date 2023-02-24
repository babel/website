```js title="JavaScript"
var babelMiddleware = require("babel-connect");

app.use(babelMiddleware({
  options: {
    // options to use when transforming files
  },
  src: "assets",
  dest: "cache"
}));

app.use(connect.static("cache"));
```

<blockquote class="alert alert--info">
  <p>
    For more information see the <a href="https://github.com/babel/babel-connect">babel/babel-connect repo</a>.
  </p>
</blockquote>

