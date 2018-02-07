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
    For more information see the <a href="https://github.com/rollup/rollup">rollup</a> and <a href="https://github.com/rollup/rollup-plugin-babel">rollup-plugin-babel</a> repos.
  </p>
</blockquote>
