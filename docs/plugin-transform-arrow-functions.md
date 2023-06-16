---
id: babel-plugin-transform-arrow-functions
title: "@babel/plugin-transform-arrow-functions"
sidebar_label: arrow-functions
---

:::info
This plugin is included in `@babel/preset-env`
:::

## Example

**In**

```js title="JavaScript"
var a = () => {};
var a = b => b;

const double = [1, 2, 3].map(num => num * 2);
console.log(double); // [2,4,6]

var bob = {
  _name: "Bob",
  _friends: ["Sally", "Tom"],
  printFriends() {
    this._friends.forEach(f => console.log(this._name + " knows " + f));
  },
};
console.log(bob.printFriends());
```

**Out**

```js title="JavaScript"
var a = function() {};
var a = function(b) {
  return b;
};

const double = [1, 2, 3].map(function(num) {
  return num * 2;
});
console.log(double); // [2,4,6]

var bob = {
  _name: "Bob",
  _friends: ["Sally", "Tom"],
  printFriends() {
    var _this = this;

    this._friends.forEach(function(f) {
      return console.log(_this._name + " knows " + f);
    });
  },
};
console.log(bob.printFriends());
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-arrow-functions
```

## Usage

### With a configuration file (Recommended)

Without options:

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-arrow-functions"]
}
```

With options:

```json title="babel.config.json"
{
  "plugins": [["@babel/plugin-transform-arrow-functions", { "spec": true }]]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-arrow-functions script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"],
});
```

## Options

### `spec`

`boolean`, defaults to `false`.

<p><details>
  <summary><b>Example</b></summary>

Using spec mode with the above example produces:

```js title="JavaScript"
var _this = this;

var a = function a() {
  babelHelpers.newArrowCheck(this, _this);
}.bind(this);
var a = function a(b) {
  babelHelpers.newArrowCheck(this, _this);
  return b;
}.bind(this);

const double = [1, 2, 3].map(
  function(num) {
    babelHelpers.newArrowCheck(this, _this);
    return num * 2;
  }.bind(this)
);
console.log(double); // [2,4,6]

var bob = {
  _name: "Bob",
  _friends: ["Sally", "Tom"],
  printFriends() {
    var _this2 = this;

    this._friends.forEach(
      function(f) {
        babelHelpers.newArrowCheck(this, _this2);
        return console.log(this._name + " knows " + f);
      }.bind(this)
    );
  },
};
console.log(bob.printFriends());
```

</details></p>

This option enables the following:

- Wrap the generated function in `.bind(this)` and keeps uses of `this` inside
  the function as-is, instead of using a renamed `this`.

- Add a runtime check to ensure the functions are not instantiated.

- Add names to arrow functions.

:::tip
You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
:::
