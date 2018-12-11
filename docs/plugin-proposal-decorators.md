---
id: babel-plugin-proposal-decorators
title: @babel/plugin-proposal-decorators
sidebar_label: proposal-decorators
---

## Example

(examples are from [proposal][proposal])

```js
@defineElement('num-counter')
class Counter extends HTMLElement {
  @observed #x = 0;

  @bound
  #clicked() {
    this.#x++;
  }

  constructor() {
    super();
    this.onclick = this.#clicked;
  }

  connectedCallback() { this.render(); }

  @bound
  render() {
    this.textContent = this.#x.toString();
  }
}
```

### Class decorator

```js
// Define the class as a custom element with the given tag name
function defineElement(tagName) {
  // In order for a decorator to take an argument, it takes that argument
  // in the outer function and returns a different function that's called
  // when actually decorating the class (manual currying).
  return function(classDescriptor) {
    let { kind, elements } = classDescriptor;
    assert(kind == "class");
    return {
      kind,
      elements,
      // This callback is called once the class is otherwise fully defined
      finisher(klass) {
        window.customElements.define(tagName, klass);
      }
    };
  };
}

```

### Method decorator

```js
// Create a bound version of the method as a field
function bound(elementDescriptor) {
  let { kind, key, descriptor } = elementDescriptor;
  assert(kind == "method");
  let { value } = descriptor
  function initializer() {
    return value.bind(this);
  }
  // Return both the original method and a bound function field that calls the method.
  // (That way the original method will still exist on the prototype, avoiding
  // confusing side-effects.)
  let boundFieldDescriptor = { ...descriptor, value: undefined }
  return {
    ...elementDescriptor,
    extras: [
      { kind: "field", key, placement: "own", descriptor: boundFieldDescriptor, initializer }
    ]
  }
}
```

### Field decorator

```js
// Whenever a read or write is done to a field, call the render()
// method afterwards. Implement this by replacing the field with
// a getter/setter pair.
function observed({kind, key, placement, descriptor, initializer}) {
  assert(kind == "field");
  assert(placement == "own");
  // Create a new anonymous private name as a key for a class element
  let storage = PrivateName();
  let underlyingDescriptor = { enumerable: false, configurable: false, writable: true };
  let underlying = { kind, key: storage, placement, descriptor: underlyingDescriptor, initializer };
  return {
    kind: "method",
    key,
    placement,
    descriptor: {
      get() { return storage.get(this); },
      set(value) {
        storage.set(this, value);
        // Assume the @bound decorator was used on render
        window.requestAnimationFrame(this.render);
      },
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    },
    extras: [underlying]
  };
}

// There is no built-in PrivateName constructor, but a new private name can
// be constructed by extracting it from a throwaway class
function PrivateName() {
  let name;
  function extract({key}) { name = key; }
  class Throwaway { @extract #_; }
  return name;
}
```

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-decorators
```

## Usage

Add the following line to your .babelrc file:

```json
{
  "plugins": ["@babel/plugin-proposal-decorators"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-decorators script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-proposal-decorators"]
});
```

## Options

### `decoratorsBeforeExport`

`boolean`

```js
// decoratorsBeforeExport: false
export @decorator class Bar {}

// decoratorsBeforeExport: true
@decorator
export class Foo {}
```

This option was added to help tc39 collect feedback from the community by allowing experimentation with both possible syntaxes.

For more information, check out: [tc39/proposal-decorators#69](https://github.com/tc39/proposal-decorators/issues/69).

### `legacy`

`boolean`, defaults to `false`.

Use the legacy (stage 1) decorators syntax and behavior.

#### NOTE: Compatibility with `@babel/plugin-proposal-class-properties`

If you are including your plugins manually and using `@babel/plugin-proposal-class-properties`, make sure that `@babel/plugin-proposal-decorators` comes *before* `@babel/plugin-proposal-class-properties`.

When using the `legacy: true` mode, `@babel/plugin-proposal-class-properties` must be used in `loose` mode to support the `@babel/plugin-proposal-decorators`.

Wrong:

```json
{
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-decorators"
  ]
}
```

Right:

```json
{
  "plugins": [
    "@babel/plugin-proposal-decorators",
    "@babel/plugin-proposal-class-properties"
  ]
}
```

```json
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ]
}
```

## References

* [Proposal: JavaScript Decorators][proposal]

[proposal]: https://github.com/tc39/proposal-decorators/blob/master/README.md
