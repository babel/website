#### Via CLI

```sh title="Shell"
browserify script.js -t babelify --outfile bundle.js
```

#### Via Node API

```js title="JavaScript"
browserify({ debug: true })
  .transform(babelify);
```

Or a more complete example:

```js title="JavaScript"
var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");

browserify({ debug: true })
  .transform(babelify)
  .require("./script.js", { entry: true })
  .bundle()
  .on("error", function (err) { console.log("Error: " + err.message); })
  .pipe(fs.createWriteStream("bundle.js"));
```

#### Passing options

**CLI**

```sh title="Shell"
browserify -d -e script.js -t [ babelify --comments false ]
```

##### Node API

```js title="JavaScript"
browserify().transform(babelify.configure({
  comments: false
}))
```

##### package.json

```json title="JSON"
{
  "transform": [["babelify", { "comments": false }]]
}
```

<blockquote class="alert alert--info">
  <p>
    For more information see the <a href="https://github.com/babel/babelify">babel/babelify repo</a>.
  </p>
</blockquote>


