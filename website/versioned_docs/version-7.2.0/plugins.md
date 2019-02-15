---
id: version-7.2.0-plugins
title: Plugins
original_id: plugins
---

Babel is a compiler (source code => output code). Like many other compilers it runs in 3 stages: parsing, transforming, and printing.

Now, out of the box Babel doesn't do anything. It basically acts like `const babel = code => code;` by parsing the code and then generating the same code back out again. You will need to add plugins for Babel to do anything.

Instead of individual plugins, you can also enable a set of plugins in a [preset](presets.md).

## Transform Plugins

These plugins apply transformations to your code.

<blockquote class="babel-callout babel-callout-info">
  <p>
    Transform plugins will enable the corresponding syntax plugin so you don't have to specify both.
  </p>
</blockquote>

### ES3

- [member-expression-literals](plugin-transform-member-expression-literals.md)
- [property-literals](plugin-transform-property-literals.md)
- [reserved-words](plugin-transform-reserved-words.md)

### ES5

- [property-mutators](plugin-transform-property-mutators.md)

### ES2015

- [arrow-functions](plugin-transform-arrow-functions.md)
- [block-scoped-functions](plugin-transform-block-scoped-functions.md)
- [block-scoping](plugin-transform-block-scoping.md)
- [classes](plugin-transform-classes.md)
- [computed-properties](plugin-transform-computed-properties.md)
- [destructuring](plugin-transform-destructuring.md)
- [duplicate-keys](plugin-transform-duplicate-keys.md)
- [for-of](plugin-transform-for-of.md)
- [function-name](plugin-transform-function-name.md)
- [instanceof](plugin-transform-instanceof.md)
- [literals](plugin-transform-literals.md)
- [new-target](plugin-transform-new-target.md)
- [object-super](plugin-transform-object-super.md)
- [parameters](plugin-transform-parameters.md)
- [shorthand-properties](plugin-transform-shorthand-properties.md)
- [spread](plugin-transform-spread.md)
- [sticky-regex](plugin-transform-sticky-regex.md)
- [template-literals](plugin-transform-template-literals.md)
- [typeof-symbol](plugin-transform-typeof-symbol.md)
- [unicode-regex](plugin-transform-unicode-regex.md)

### ES2016

- [exponentiation-operator](plugin-transform-exponentiation-operator.md)

### ES2017

- [async-to-generator](plugin-transform-async-to-generator.md)

### ES2018

- [async-generator-functions](plugin-proposal-async-generator-functions.md)
- [dotall-regex](plugin-transform-dotall-regex.md)
- [object-rest-spread](plugin-proposal-object-rest-spread.md)
- [optional-catch-binding](plugin-proposal-optional-catch-binding.md)
- [unicode-property-regex](plugin-proposal-unicode-property-regex.md)

### Modules

- [modules-amd](plugin-transform-modules-amd.md)
- [modules-commonjs](plugin-transform-modules-commonjs.md)
- [modules-systemjs](plugin-transform-modules-systemjs.md)
- [modules-umd](plugin-transform-modules-umd.md)

### Experimental

- [class-properties](plugin-proposal-class-properties.md)
- [decorators](plugin-proposal-decorators.md)
- [do-expressions](plugin-proposal-do-expressions.md)
- [export-default-from](plugin-proposal-export-default-from.md)
- [export-namespace-from](plugin-proposal-export-namespace-from.md)
- [function-bind](plugin-proposal-function-bind.md)
- [function-sent](plugin-proposal-function-sent.md)
- [logical-assignment-operators](plugin-proposal-logical-assignment-operators.md)
- [nullish-coalescing-operator](plugin-proposal-nullish-coalescing-operator.md)
- [numeric-separator](plugin-proposal-numeric-separator.md)
- [optional-chaining](plugin-proposal-optional-chaining.md)
- [pipeline-operator](plugin-proposal-pipeline-operator.md)
- [private-methods](plugin-proposal-private-methods.md)
- [throw-expressions](plugin-proposal-throw-expressions.md)

### Minification

Check out our [minifier based on Babel](https://github.com/babel/minify)!

These plugins are in the minify repo.

- [inline-consecutive-adds](plugin-transform-inline-consecutive-adds.md)
- [inline-environment-variables](plugin-transform-inline-environment-variables.md)
- [member-expression-literals](plugin-transform-member-expression-literals.md)
- [merge-sibling-variables](plugin-transform-merge-sibling-variables.md)
- [minify-booleans](plugin-transform-minify-booleans.md)
- [minify-builtins](plugin-minify-builtins.md)
- [minify-constant-folding](plugin-minify-constant-folding.md)
- [minify-dead-code-elimination](plugin-minify-dead-code-elimination.md)
- [minify-flip-comparisons](plugin-minify-flip-comparisons.md)
- [minify-guarded-expressions](plugin-minify-guarded-expressions.md)
- [minify-infinity](plugin-minify-infinity.md)
- [minify-mangle-names](plugin-minify-mangle-names.md)
- [minify-numeric-literals](plugin-minify-numeric-literals.md)
- [minify-replace](plugin-minify-replace.md)
- [minify-simplify](plugin-minify-simplify.md)
- [minify-type-constructors](plugin-minify-type-constructors.md)
- [node-env-inline](plugin-transform-node-env-inline.md)
- [property-literals](plugin-transform-property-literals.md)
- [regexp-constructors](plugin-transform-regexp-constructors.md)
- [remove-console](plugin-transform-remove-console.md)
- [remove-debugger](plugin-transform-remove-debugger.md)
- [remove-undefined](plugin-transform-remove-undefined.md)
- [simplify-comparison-operators](plugin-transform-simplify-comparison-operators.md)
- [undefined-to-void](plugin-transform-undefined-to-void.md)

### React

- [react-constant-elements](plugin-transform-react-constant-elements.md)
- [react-display-name](plugin-transform-react-display-name.md)
- [react-inline-elements](plugin-transform-react-inline-elements.md)
- [react-jsx](plugin-transform-react-jsx.md)
- [react-jsx-compat](plugin-transform-react-jsx-compat.md)
- [react-jsx-self](plugin-transform-react-jsx-self.md)
- [react-jsx-source](plugin-transform-react-jsx-source.md)

### Other

- [external-helpers](plugin-external-helpers.md)
- [flow-strip-types](plugin-transform-flow-strip-types.md)
- [jscript](plugin-transform-jscript.md)
- [object-assign](plugin-transform-object-assign.md)
- [object-set-prototype-of-to-assign](plugin-transform-object-set-prototype-of-to-assign.md)
- [proto-to-assign](plugin-transform-proto-to-assign.md)
- [regenerator](plugin-transform-regenerator.md)
- [runtime](plugin-transform-runtime.md)
- [strict-mode](plugin-transform-strict-mode.md)
- [typescript](plugin-transform-typescript.md)

## Syntax Plugins

These plugins only allow Babel to **parse** specific types of syntax (not transform).

> NOTE: transform plugins automatically enable the syntax plugins. So you don't need to specify the syntax plugin if the corresponding transform plugin is used already.

Alternatively, you can also provide any [`plugins` option](parser.md#plugins) from the Babel parser:

Your `.babelrc`:

```json
{
  "parserOpts": {
    "plugins": ["jsx", "flow"]
  }
}
```

## Plugin/Preset Paths

If the plugin is on npm, you can pass in the name of the plugin and babel will check that it's installed in `node_modules`

```json
{
  "plugins": ["babel-plugin-myPlugin"]
}
```

You can also specify an relative/absolute path to your plugin.

```json
{
  "plugins": ["./node_modules/asdf/plugin"]
}
```

### Plugin Shorthand

If the name of the package is prefixed with `babel-plugin-`, you can use a shorthand:

```js
{
  "plugins": [
    "myPlugin",
    "babel-plugin-myPlugin" // equivalent
  ]
}
```

This also works with scoped packages:

```js
{
  "plugins": [
    "@org/babel-plugin-name",
    "@org/name" // equivalent
  ]
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
  "presets": ["es2015", "react", "stage-2"]
}
```

Will run in the following order: `stage-2`, `react`, then `es2015`.

This is mostly for ensuring backwards compatibility, since most users list "es2015" before "stage-0". For more information, see [notes on potential traversal API changes](https://github.com/babel/notes/blob/master/2016/2016-08/august-01.md#potential-api-changes-for-traversal).

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
