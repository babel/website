---
id: babel-plugin-proposal-function-bind
title: "@babel/plugin-proposal-function-bind"
sidebar_label: function-bind
---

## Detail

```js title="JavaScript"
obj::func;
// is equivalent to:
func.bind(obj)

::obj.func;
// is equivalent to:
obj.func.bind(obj);

obj::func(val);
// is equivalent to:
func
  .call(obj, val)

::obj.func(val);
// is equivalent to:
obj.func.call(obj, val);
```

## Example

### Basic

```js title="JavaScript"
const box = {
  weight: 2,
  getWeight() {
    return this.weight;
  },
};

const { getWeight } = box;

console.log(box.getWeight()); // prints '2'

const bigBox = { weight: 10 };
console.log(bigBox::getWeight()); // prints '10'

// Can be chained:
function add(val) {
  return this + val;
}

console.log(bigBox::getWeight()::add(5)); // prints '15'
```

### Using with `document.querySelectorAll`

It can be very handy when used with `document.querySelectorAll`:

```js title="JavaScript"
const { map, filter } = Array.prototype;

let sslUrls = document
  .querySelectorAll("a")
  ::map(node => node.href)
  ::filter(href => href.substring(0, 5) === "https");

console.log(sslUrls);
```

`document.querySelectorAll` returns a `NodeList` element which is not a plain array, so you normally can't use the `map` function on it, and have to use it this way: `Array.prototype.map.call(document.querySelectorAll(...), node => { ... })`. The above code using the `::` will work because it is equivalent to:

```js title="JavaScript"
const { map, filter } = Array.prototype;

let sslUrls = document.querySelectorAll("a");
sslUrls = map.call(sslUrls, node => node.href);
sslUrls = filter.call(sslUrls, href => href.substring(0, 5) === "https");

console.log(sslUrls);
```

### Auto self binding

When nothing is specified before the `::` operator, the function is bound to its object:

```js title="JavaScript"
$(".some-link").on("click", ::view.reset);
// is equivalent to:
$(".some-link").on("click", view.reset.bind(view));
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-function-bind
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-proposal-function-bind"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-proposal-function-bind script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-function-bind"],
});
```

## References

- [Proposal](https://github.com/zenparsing/es-function-bind)
- [Babel Blog: Function Bind Syntax](/blog/2015/05/14/function-bind)
