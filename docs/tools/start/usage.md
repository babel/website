```js
import Start from 'start';
import reporter from 'start-pretty-reporter';
import files from 'start-files';
import read from 'start-read';
import babel from 'start-babel';
import write from 'start-write';

const start = Start(reporter());

export function build() {
  return start(
    files('lib/**/*.js'),
    read(),
    babel({ sourceMaps: true }),
    write('build/')
  );
}
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the <a href="https://github.com/start-runner/babel">start-runner/babel repo</a>.
  </p>
</blockquote>
