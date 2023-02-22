```js title="JavaScript"
module.exports = function(config) {
  config.set({
    files: [
      "src/**/*.js",
      "test/**/*.js"
    ],
    preprocessors: {
      "src/**/*.js": ["babel"],
      "test/**/*.js": ["babel"]
    },
    "babelPreprocessor": {
      // options go here
      options: {
        presets: ["@babel/preset-env"],
        sourceMap: "inline"
      },
    }
  });
};
```

<blockquote class="alert alert--info">
  <p>
    For more information see the <a href="https://github.com/babel/karma-babel-preprocessor">babel/karma-babel-preprocessor repo</a>.
  </p>
</blockquote>

