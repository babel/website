```js
var rollup = require("rollup");
var babel = require("rollup-plugin-babel");

rollup.rollup({
  entry: "src/main.js",
  plugins: [ babel() ]
}).then(function (bundle) {
  bundle.write({
    dest: "dist/bundle.js",
    format: "umd"
  });
});
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/rollup/rollup">rollup</a> 和 <a href="https://github.com/rollup/rollup-plugin-babel">rollup-plugin-babel</a> 项目.
  </p>
</blockquote>
