```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import read from '@start/plugin-read'
import babel from '@start/plugin-lib-babel'
import write from '@start/plugin-write'

const babelConfig = {
  // …
  babelrc: false,
  sourceMap: true,
}

export const task = () =>
  sequence(
    find('src/**/*.js'),
    read,
    babel(babelConfig),
    write('build/')
  )
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the <a href="https://github.com/deepsweet/start">deepsweet/start repo</a>.
  </p>
</blockquote>
