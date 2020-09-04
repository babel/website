Add the following paths to your configuration:

```js
paths: {
    es6: '...node_modules/requirejs-babel/es6',
    babel: '...node_modules/@babel/standalone/babel.min',
    'babel-plugin-module-resolver': '...node_modules/babel-plugin-module-resolver-standalone/index'
  }
```

Then reference files via the `es6!` plugin name:

```js
define(["es6!your-es6-module"], function (module) {
  // ...
});
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the <a href="https://github.com/mikach/requirejs-babel">mikach/requirejs-babel repo</a>.
  </p>
</blockquote>
