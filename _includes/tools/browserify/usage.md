#### 通过 CLI 使用

```sh
browserify script.js -t babelify --outfile bundle.js
```

#### 通过 Node API 使用

```js
browserify({ debug: true })
  .transform(babelify);
```

或者一个更完整的例子:

```js
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

#### 传递选项

**CLI**

```sh
browserify -d -e script.js -t [ babelify --comments false ]
```

##### Node API

```js
browserify().transform(babelify.configure({
  comments: false
}))
```

##### package.json

```json
{
  "transform": [["babelify", { "comments": false }]]
}
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/babel/babelify">babel/babelify 仓库</a>.
  </p>
</blockquote>


