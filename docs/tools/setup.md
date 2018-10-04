<p>Great! You've configured Babel but you haven't made it actually <em>do</em> anything. Create a <a href="/docs/usage/babelrc">.babelrc</a> config in your project root and enable some <a href="/docs/plugins">plugins</a>.</p>

To start, you can use the <a href="https://babeljs.io/docs/plugins/preset-env">env preset</a>, which enables transforms for ES2015+

```shell
npm install @babel/preset-env --save-dev
```

In order to enable the preset you have to define it in your <code>.babelrc</code> file, like this:

```json
{
  "presets": ["@babel/preset-env"]
}
```
