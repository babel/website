#### [CLI](https://github.com/segmentio/metalsmith#cli)

Add the `metalsmith-babel` field to your `metalsmith.json`.

```js title="JavaScript"
{
  "plugins": {
    "metalsmith-babel": {
      // babel options
      "presets": ["@babel/preset-env"]
    }
  }
}
```

#### [API](https://github.com/segmentio/metalsmith#api)

```js title="JavaScript"
var Metalsmith = require("metalsmith");
var babel = require("metalsmith-babel");

new Metalsmith("./source")
  .use(babel({
    /* babel options */
    presets: ["@babel/preset-env"]
  }))
  .build(function(err, files) {
    if (err) {
      throw err;
    }

    console.log("Completed.");
  });
```

<blockquote class="alert alert--info">
  <p>
    For more information see the <a href="https://github.com/babel/metalsmith-babel">babel/metalsmith-babel repo</a>.
  </p>
</blockquote>
