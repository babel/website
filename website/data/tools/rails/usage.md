Add Babel to your Webpack config:

```js title="webpack.config.js"
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};
```

And enable a preset (for example in `package.json`):

```json title="package.json"
{
  "babel": {
    "presets": ["@babel/preset-env"]
  }
}
```

<blockquote class="alert alert--info">
  <p>
    For more information see the
    <a href="https://github.com/rails/jsbundling-rails">rails/jsbundling-rails</a>
    repo and its
    <a href="https://github.com/rails/jsbundling-rails/blob/main/docs/switch_from_webpacker.md#optional-babel">Optional: Babel</a>
    section. If you need Webpacker features such as HMR or code splitting, consider
    <a href="https://github.com/shakacode/shakapacker">shakapacker</a>.
  </p>
</blockquote>

Alternatively, if you need Babel to transpile JavaScript that's processed
through <a href="https://github.com/rails/sprockets">sprockets</a>, refer to the
setup instructions for
<a href="#installation" onclick="event.preventDefault(); document.querySelector('.tools-button[data-title=sprockets]').click()">integrating babel with sprockets</a>.
