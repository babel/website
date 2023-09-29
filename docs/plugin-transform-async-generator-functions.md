---
id: babel-plugin-transform-async-generator-functions
title: "@babel/plugin-transform-async-generator-functions"
sidebar_label: async-generator-functions
---

:::info
This plugin is included in `@babel/preset-env`, in [ES2018](https://github.com/tc39/proposals/blob/master/finished-proposals.md)
:::

## Example

**In**

```js title="JavaScript"
async function* agf() {
  await 1;
  yield 2;
}
```

**Out**

```js title="JavaScript"
var _asyncGenerator = ...

let agf = (() => {
  var _ref = _asyncGenerator.wrap(function* () {
    yield _asyncGenerator.await(1);
    yield 2;
  });

  return function agf() {
    return _ref.apply(this, arguments);
  };
})();
```

For await example

```js title="JavaScript"
async function f() {
  for await (let x of y) {
    g(x);
  }
}
```

**Example Usage**

```js title="JavaScript"
async function* genAnswers() {
  var stream = [Promise.resolve(4), Promise.resolve(9), Promise.resolve(12)];
  var total = 0;
  for await (let val of stream) {
    total += await val;
    yield total;
  }
}

function forEach(ai, fn) {
  return ai.next().then(function(r) {
    if (!r.done) {
      fn(r);
      return forEach(ai, fn);
    }
  });
}

var output = 0;
forEach(genAnswers(), function(val) {
  output += val.value;
}).then(function() {
  console.log(output); // 42
});
```

[Try it Out in the REPL](https://babel.dev/repl#?browsers=ie%2011&build=&builtIns=usage&spec=false&loose=false&code_lz=IYZwngdgxgBAZgV2gFwJYHsICoYHMCmEAghCAO74BOIAFAJQwDeAUDDAG7CUwjKX7AAtjAC8MANowACpXSDUIfADp-IdABt2-GgBY6AGmmz5ilfjWbtATgNG5C5ao1aaARgBMDALoBuVhy4YZHRkYHVRGAAGPzY4dG5gMmBUZBgadXxUznD0OB4-AUEGFjY2YNDwgGoxROSssJjSsFR8dQATIJCG_wBfZj7mRBQMCHh4gFFgKAALGmTDOAhi_35kBEpR5KUIfAAPZHolZGnCGiGoNEw0ymXSmFQ8mgBCSiU2zHxbu_gIGhvGu6rdajOKUSYzOaoBZLAEwPpsHp0PwDTjcdAIZAABwxEWigwmU1mBGIpAo1HoCyQFxGNGyxRg6KxOOqAXUSmyCHwcLozCOJ1-50uo3oTH8UEwFmU6nQuBojOxyCRMAA9MqYDp3P0kUA&debug=false&forceAllTransforms=false&shippedProposals=true&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env&prettier=false&targets=&version=7.13.15)

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-async-generator-functions
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-async-generator-functions"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-async-generator-functions script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-async-generator-functions"],
});
```

## References

- [Proposal: Asynchronous iteration for ECMAScript](https://github.com/tc39/proposal-async-iteration)
