---
id: index
title: What is Babel?
---

## Babel is a JavaScript compiler

Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments. Here are the main things Babel can do for you:

- Transform syntax
- Polyfill features that are missing in your target environment (through a third-party polyfill such as [core-js](https://github.com/zloirock/core-js))
- Source code transformations (codemods)
- And more! (check out these [videos](/videos.html) for inspiration)

```js
// Babel Input: ES2015 arrow function
[1, 2, 3].map(n => n + 1);

// Babel Output: ES5 equivalent
[1, 2, 3].map(function(n) {
  return n + 1;
});
```

> For an awesome tutorial on compilers, check out [the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler), which also explains how Babel itself works on a high level.

## ES2015 and beyond

Babel has support for the latest version of JavaScript through syntax transformers.

These [plugins](plugins.md) allow you to use new syntax, **right now** without waiting for browser support. Check out our [usage guide](usage.md) to get started.

## JSX and React

Babel can convert JSX syntax! Check out our [React preset](preset-react.md) to get started. Use it together with the [babel-sublime](https://github.com/babel/babel-sublime) package to bring syntax highlighting to a whole new level.

You can install this preset with

```shell
npm install --save-dev @babel/preset-react
```

and add `@babel/preset-react` to your Babel configuration.

```jsx
export default function DiceRoll(){
  const [num, setNum] = useState(getRandomNumber());

  const getRandomNumber = () => {
    return Math.ceil(Math.random() * 6);
  };

  return (
    <div>
      Your dice roll:
      {num}
    </div>
  );
};
```

> Learn more about [JSX](https://facebook.github.io/jsx/)

## Type Annotations (Flow and TypeScript)

Babel can strip out type annotations! Check out either our [Flow preset](preset-flow.md) or [TypeScript preset](preset-typescript.md) to get started. Keep in mind that **Babel doesn't do type checking**; you'll still have to install and use Flow or TypeScript to check types.

You can install the flow preset with

```shell
npm install --save-dev @babel/preset-flow
```

```js
// @flow
function square(n: number): number {
  return n * n;
}
```

or the typescript preset with

```shell
npm install --save-dev @babel/preset-typescript
```

```js
function Greeter(greeting: string) {
  this.greeting = greeting;
}
```

> Learn more about [Flow](https://flow.org/) and [TypeScript](https://www.typescriptlang.org/)

## Pluggable

Babel is built out of plugins. Compose your own transformation pipeline using existing plugins or write your own. Easily use a set of plugins by using or creating a [preset](plugins.md#presets). [Learn more →](plugins.md)

Create a plugin on the fly with [astexplorer.net](https://astexplorer.net/#/KJ8AjD6maa) or use [generator-babel-plugin](https://github.com/babel/generator-babel-plugin) to generate a plugin template.

```javascript
// A plugin is just a function
export default function({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        let name = path.node.name; // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name
          .split("")
          .reverse()
          .join("");
      },
    },
  };
}
```

## Debuggable

**Source map** support so you can debug your compiled code with ease.

## Spec Compliant

Babel tries to stay true to the ECMAScript standard, as much as reasonably possible. It may also have specific options to be more spec compliant as a tradeoff to performance.

## Compact

Babel tries using the least amount of code possible with no dependence on a bulky runtime.

This may be difficult to do in cases, and there are ["assumptions"](/assumptions) options that tradeoff spec compliancy for readability, file size, and speed.
