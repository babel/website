#### Mocha 8

In your `package.json` file make the following changes:

Create `.mocharc.yaml` in your project root:
```yaml
require:
  - '@babel/register'
```

Some features may require a polyfill:

```sh title="Shell"
# Polyfills for builtin methods
npm install --save core-js
```

Add import polyfills _before_ `@babel/register`.
```yaml
require:
  - 'core-js'
  - '@babel/register'
```

Create `babel.config.json` in your project root:
```json title="babel.config.json"
{
  "presets": ["@babel/preset-env"]
}
```

<blockquote class="alert alert--info">
  <p>
    For more information see the <code>babel</code>
    <a href="https://github.com/mochajs/mocha-examples/tree/master/packages/babel">mocha-examples</a>.
  </p>
</blockquote>

#### Mocha 3

`--compilers` is deprecated as of Mocha v4.0.0. See [further explanation and workarounds](https://github.com/mochajs/mocha/wiki/compilers-deprecation).

```json title="JSON"
{
  "scripts": {
    "test": "mocha --compilers js:@babel/register"
  }
}
```

With polyfill:

```json title="JSON"
{
  "scripts": {
    "test": "mocha --require babel-polyfill --compilers js:@babel/register"
  }
}
```
