---
id: babel-standalone
title: "@babel/standalone"
---

`@babel/standalone` provides a standalone build of Babel for use in browsers and other non-Node.js environments.

## When (not) to use @babel/standalone

If you're using Babel in production, you should normally not use `@babel/standalone`. Instead, you should use a build system running on Node.js, such as Webpack, Rollup, or Parcel, to transpile your JS ahead of time.

However, there are some valid use cases for @babel/standalone:

- It provides an easy, convenient way to prototype with Babel. Using `@babel/standalone`, you can get started using Babel with just a simple script tag in your HTML.
- Sites that compile user-provided JavaScript in real-time, like [JSFiddle](https://jsfiddle.net/), [JS Bin](https://jsbin.com/), the [REPL on the Babel site](http://babeljs.io/repl/), [JSitor](https://jsitor.com), etc.
- Apps that embed a JavaScript engine such as V8 directly, and want to use Babel for compilation
- Apps that want to use JavaScript as a scripting language for extending the app itself, including all the goodies that modern ES provides.
- Other non-Node.js environments ([ReactJS.NET](http://reactjs.net/), [ruby-babel-transpiler](https://github.com/babel/ruby-babel-transpiler), [php-babel-transpiler](https://github.com/talyssonoc/php-babel-transpiler), etc).

## Installation

There are several ways to get a copy of `@babel/standalone`. Pick whichever one you like:

- Use it via [UNPKG](https://unpkg.com/@babel/standalone/babel.min.js). This is a simple way to embed it on a webpage without having to do any other setup.
  ```html
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  ```
- Install it manually:
  ```shell npm2yarn
  npm install --save @babel/standalone
  ```

## Script Tags

When loaded in a browser, `@babel/standalone` will automatically compile and execute all script tags with type `text/babel` or `text/jsx`:

```html
<div id="output"></div>
<!-- Load Babel -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<!-- Your custom script here -->
<script type="text/babel">
  const getMessage = () => "Hello World";
  document.getElementById("output").innerHTML = getMessage();
</script>
```

### Attributes

#### `data-type`
Added in: `v7.10.0`

If you want to use your browser's native support for ES Modules, you'd normally need to set a `type="module"` attribute on your script tag.

With `@babel/standalone`, set a `data-type="module"` attribute instead, like this:

```html
<script type="text/babel" data-type="module">
```

#### `data-presets`
Use the `data-presets` attributes to enable builtin Babel presets. Multiple values are comma separated:

```html
<script type="text/babel" data-presets="env,react">
```
Most popular presets are: [`env`](./preset-env.md), [`react`](./preset-react.md), [`typescript`](./preset-typescript.md), [`flow`](./preset-flow.md). You can also use `Babel.availablePresets` to query available presets.

If you want to pass additional options, refer to the [custom presets](#custom-presets-passing-options-to-built-in-presetsplugins) section.

#### `data-plugins`
Use the `data-plugins` attribute to enable builtin Babel plugins. Multiple values are comma separated.

```html
<script type="text/babel" data-plugins="transform-class-properties">
```

See [here](https://github.com/babel/babel/blob/main/packages/babel-standalone/src/generated/plugins.ts) for a list of builtin plugins in `@babel/standalone`. You can also access the list from `Babel.availablePlugins`.

If you want to add custom plugins, refer to the [custom plugins](#custom-plugins) section.

#### `src`
Loading external scripts via `src` attribute is supported too:

```html
<script type="text/babel" src="foo.js"></script>
```

#### `async`
You can also set the `async` attribute for external scripts.

```html
<script type="text/babel" src="foo.js" async></script>
```

## API

Load `babel.js` or `babel.min.js` in your environment. This will expose [Babel's API](http://babeljs.io/docs/usage/api/) in a `Babel` object:

```js title="JavaScript"
var input = 'const getMessage = () => "Hello World";';
var output = Babel.transform(input, { presets: ["env"] }).code;
```

Note that [config files](config-files.md) don't work in `@babel/standalone`, as no file system access is available. The presets and/or plugins to use **must** be specified in the options passed to `Babel.transform`.

## Customization

### custom plugins

Custom plugins and presets can be added using the `registerPlugin` and `registerPreset` methods respectively:

```js title="JavaScript"
// Simple plugin that converts every identifier to "LOL"
function lolizer() {
  return {
    visitor: {
      Identifier(path) {
        path.node.name = "LOL";
      },
    },
  };
}
Babel.registerPlugin("lolizer", lolizer);
```

Once registered, you can either use the custom plugin in an inline script:

```html
<script type="text/babel" data-plugins="lolizer">
```

Or you can use the plugin with `Babel.transform`:

```js title="JavaScript"
var output = Babel.transform("function helloWorld() { alert(hello); }", {
  plugins: ["lolizer"],
});
// Returns "function LOL() { LOL(LOL); }"
```

### custom presets: passing options to built-in presets/plugins

If you want to pass options to builtin plugins and presets, you can create a new preset and pass these options inside the preset.

```js title="JavaScript"
// Define a preset
Babel.registerPreset("env-plus", {
  presets: [[Babel.availablePresets["env"], { loose: true }]],
  plugins: [
    [
      Babel.availablePlugins["proposal-decorators"],
      { version: "2023-01" },
    ],
  ],
});
```

Once registered, you can use this preset in an inline script:

```html
<script type="text/babel" data-presets="env-plus">
```
