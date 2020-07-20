```js
import babel from '@rollup/plugin-babel';

const config = {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'esm'
  },
  plugins: [babel({ babelHelpers: 'bundled' })]
};

export default config;
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the <a href="https://github.com/rollup/rollup">rollup</a> and <a href="https://github.com/rollup/plugins/tree/master/packages/babel">@rollup/plugin-babel</a> repos.
  </p>
</blockquote>
