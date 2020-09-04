```js
grunt.initConfig({
  babel: {
    options: {
      sourceMap: true,
      presets: ["@babel/preset-env"],
    },
    dist: {
      files: {
        "dist/app.js": "src/app.js",
      },
    },
  },
});

grunt.loadNpmTasks('grunt-babel');

grunt.registerTask("default", ["babel"]);
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the <a href="https://github.com/babel/grunt-babel">babel/grunt-babel repo</a>.
  </p>
</blockquote>

