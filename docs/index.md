---
id: index
title: What is Babel?
---

## Babel is a JavaScript compiler

Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in old browsers or environments.

## ES2015 and beyond

Babel has support for the latest version of JavaScript through syntax transformers.

These [plugins](plugins.md) allow you to use new syntax, **right now** without waiting for browser support. Check out our [usage guide](usage.md) to get started.

## JSX and Flow

Babel can convert JSX syntax and strip out type annotations. Check out our [React preset](preset-react.md) to get started. Use it together with the [babel-sublime](https://github.com/babel/babel-sublime) package to bring syntax highlighting to a whole new level.

You can install this preset with

```shell
npm install --save-dev @babel/preset-react
```

and don't forget to add `@babel/preset-react` to your Babel configuration.

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
