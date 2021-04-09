---
id: plugins
title: Plugins
---

Babel's code transformations are enabled by applying plugins (or [presets](presets.md)) to your [configuration file](config-files.md).

<div id="pluginpreset-paths"></div>

## Using a Plugin

If the plugin is on [npm](https://www.npmjs.com/search?q=babel-plugin), you can pass in the name of the plugin and Babel will check that it's installed in `node_modules`. This is added to the [plugins](options.md#presets) config option, which takes an array.

```json
{
  "plugins": ["babel-plugin-myPlugin", "@babel/plugin-transform-runtime"]
}
```

You can also specify an relative/absolute path to your plugin.

```json
{
  "plugins": ["./node_modules/asdf/plugin"]
}
```

See [name normalization](options.md#name-normalization) for more specifics on configuring the path of a plugin or preset.

## Transform Plugins

These plugins apply transformations to your code.

<blockquote class="babel-callout babel-callout-info">
  <p>
    Transform plugins will enable the corresponding syntax plugin so you don't have to specify both.
  </p>
</blockquote>

## Syntax Plugins

Most syntax is transformable by Babel. In rarer cases (if the transform isn't implemented yet, or there isn't a default way to do so), you can use plugins such as `@babel/plugin-syntax-bigint` to only allow Babel to **parse** specific types of syntax. Or you want to preserve the source code because you only want Babel to do code analysis or codemods.

> NOTE: You don't need to specify the syntax plugin if the corresponding transform plugin is used already, since it enables it automatically.

Alternatively, you can also provide any [`plugins` option](parser.md#plugins) from the Babel parser:

Your `.babelrc`:

```json
{
  "parserOpts": {
    "plugins": ["jsx", "flow"]
  }
}
```

## Plugin Ordering

> Ordering matters for each visitor in the plugin.

This means if two transforms both visit the "Program" node, the transforms will run in either plugin or preset order.

- Plugins run before Presets.
- Plugin ordering is first to last.
- Preset ordering is reversed (last to first).

For example:

```json
{
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```

Will run `transform-decorators-legacy` then `transform-class-properties`.

It is important to remember that with presets, the order is _reversed_. The following:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Will run in the following order: `@babel/preset-react` then `@babel/preset-env`.

## Plugin Options

Both plugins and presets can have options specified by wrapping the name and an options object in an array inside your config.

For specifying no options, these are all equivalent:

```json
{
  "plugins": ["pluginA", ["pluginA"], ["pluginA", {}]]
}
```

To specify an option, pass an object with the keys as the option names.

```json
{
  "plugins": [
    [
      "transform-async-to-module-method",
      {
        "module": "bluebird",
        "method": "coroutine"
      }
    ]
  ]
}
```

Settings options for presets works exactly the same:

```json
{
  "presets": [
    [
      "env",
      {
        "loose": true,
        "modules": false
      }
    ]
  ]
}
```

## Plugin Development

Please refer to the excellent [babel-handbook](https://github.com/thejameskyle/babel-handbook)
to learn how to create your own plugins.

The simple plugin that reverses names (from the homepage):

```js
export default function() {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name
          .split("")
          .reverse()
          .join("");
      },
    },
  };
}
```
