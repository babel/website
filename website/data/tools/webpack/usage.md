#### Via config

```js title="JavaScript"
{
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
```

<blockquote class="alert alert--info">
  <p>
    For more information see the <a href="https://github.com/babel/babel-loader">babel/babel-loader repo</a>.
  </p>
</blockquote>
