<p>Great! You've configured Babel but you haven't made it actually <em>do</em> anything. Create a <a href="/docs/usage#configuration">babel.config.json</a> config in your project root and enable some <a href="/docs/presets">presets</a>.</p>

To start, you can use the <a href="/docs/plugins/preset-env">env preset</a>, which enables transforms for ES2015+

```shell
npm install @babel/preset-env --save-dev
```

In order to enable the preset you have to define it in your <code>babel.config.json</code> file, like this:

```json
{
  "presets": ["@babel/preset-env"]
}
```
