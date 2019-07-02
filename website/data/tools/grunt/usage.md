```js
require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
  "babel": {
    options: {
      sourceMap: true
    },
    dist: {
      files: {
        "dist/app.js": "src/app.js"
      }
    }
  }
});

grunt.registerTask("default", ["babel"]);
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the <a href="https://github.com/babel/grunt-babel">babel/grunt-babel repo</a>.
  </p>
</blockquote>

