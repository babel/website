---
id: version-6.x-index
title: What is Babel?
original_id: index
---

## Babel is a JavaScript compiler

Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in old browsers or environments.

## Basic setup for a library  

> Install the Babel command line tool (`babel-cli`) and a Babel preset

```shell
npm install --save-dev babel-cli babel-preset-env
```

\> Create a [`.babelrc`](babelrc.md) file (or use your [package.json](babelrc.md#use-via-packagejson))

```json
{ "presets": ["env"] }
```

> Run over your src files and output to a folder

```sh
./node_modules/.bin/babel src --out-dir lib
```

\> For more information on setting up Babel with your build system, IDE, and more, check out our [interactive setup guide](/setup.html).

ES2015 and beyond
-----------------

Babel has support for the latest version of JavaScript through syntax transformers. These [plugins](plugins.md) allow you to use new syntax, **right now** without waiting for browser support. Check out our [env preset](preset-env.md) to get started.

You can install this preset with:

```shell
npm install --save-dev babel-preset-env
```

and add `"env"` to your `.babelrc`: `{ "presets": ["env"] }`

[Learn more about ES2015 →](learn.md)

Polyfill
--------

Since Babel only transforms syntax (like arrow functions), you can use babel-polyfill in order to support new globals such as Promise or new native methods like String.padStart (left-pad). It uses [core-js](https://github.com/zloirock/core-js) and [regenerator](https://facebook.github.io/regenerator/). Check out our [babel-polyfill](/docs/usage/polyfill) docs for more info.

You can install the polyfill with

```shell
npm install --save-dev babel-polyfill
```

Use it by requiring it at the top of the entry point to your application or in your bundler config.

[Learn about more features →](https://github.com/zloirock/core-js#index)

JSX and Flow
------------

Babel can convert JSX syntax and strip out type annotations. Check out our [React preset](preset-react.md) to get started. Use it together with the [babel-sublime](https://github.com/babel/babel-sublime) package to bring syntax highlighting to a whole new level.

You can install this preset with

```shell
npm install --save-dev babel-preset-react
```

and add `"react"` to your `.babelrc`: `{ "presets": ["env", "react"] }`

```jsx
export default React.createClass({
  getInitialState() {
    return { num: this.getRandomNumber() };
  },

  getRandomNumber(): number {
    return Math.ceil(Math.random() * 6);
  },

  render(): any {
    return <div>
      Your dice roll:
      {this.state.num}
    </div>;
  }
});
```

> Learn more about [JSX](https://facebook.github.io/jsx/) and [Flow](http://flowtype.org/)

Pluggable
---------

Babel is built out of plugins. Compose your own transformation pipeline using existing plugins or write your own. Easily use a set of plugins by using or creating a [preset](plugins.md#presets). [Learn more →](plugins.md)

Create a plugin on the fly with [astexplorer.net](https://astexplorer.net/#/KJ8AjD6maa) or use [generator-babel-plugin](https://github.com/babel/generator-babel-plugin) to generate a plugin template.

```javascript
// A plugin is just a function
export default function ({types: t}) {
  return {
    visitor: {
      Identifier(path) {
        let name = path.node.name; // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split('').reverse().join('');
      }
    }
  };
}
```

Debuggable
----------

**Source map** support so you can debug your compiled code with ease.

Spec Compliant
--------

Babel tries to stay true to the ECMAScript standard, as much as reasonably possible. It may also have specific options to be more spec compliant as a tradeoff to performance.

Compact
--------

Babel tries uses the least amount of code possible with no dependence on a bulky runtime.

This may be difficult to do in cases, and there are "loose" options for specific transforms that may tradeoff spec compliancy for readability, file size, and speed.
