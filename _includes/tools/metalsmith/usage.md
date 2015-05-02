#### [CLI](https://github.com/segmentio/metalsmith#cli)

Add the `metalsmith-babel` field to your `metalsmith.json`.

```javascript
{
  "plugins": {
    "metalsmith-babel": {
      // babel options
    }
  }
}
```

#### [API](https://github.com/segmentio/metalsmith#api)

```javascript
var Metalsmith = require("metalsmith");
var babel = require("metalsmith-babel");

new Metalsmith("./source")
  .use(babel({/* babel options */}));
  .build(function(err, files) {
    if (err) {
      throw err;
    }

    console.log("Completed.");
  });
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the <a href="https://github.com/babel/metalsmith-babel">babel/metalsmith-babel repo</a>.
  </p>
</blockquote>
