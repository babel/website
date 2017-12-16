---
layout: docs
title: babel-preset-es2015 -> babel-preset-env
permalink: /env/
---

> We're super 😸 excited that you're trying to use ES2015 syntax, but instead of continuing yearly presets, the team recommends using babel-preset-env. By default, it has the same behavior as previous presets to compile ES2015+ to ES5.
> Please check out the [v1.x readme for more info](https://github.com/babel/babel-preset-env/tree/1.x). (For Babel 7, we have moved the preset into the [main babel repo](https://github.com/babel/babel/tree/master/packages/babel-preset-env).

### Babel 7

If you are using v7 you'll need `npm install @babel/preset-env` and `"presets": ["@babel/env"]`

## Upgrading to `babel-preset-env`

### Install

```sh
npm install babel-preset-env --save-dev
```
#### Basic `.babelrc` change

```diff
{
+  "presets": ["env"]
-  "presets": ["es2015"]
}
```

#### `.babelrc` change with options

```diff
{
  "presets": [
+   ["env", {
-   ["es2015", {
      "modules": false
    }]
  ]
}
```

`babel-preset-env` is a new preset, first released over a year ago that replaces many presets that were previously used including:

- `babel-preset-es2015`, `babel-preset-es2016`, `babel-preset-es2017`
- `babel-preset-latest`
- other community plugins involving `es20xx`:
  - `babel-preset-node5`, `babel-preset-es2015-node`, etc

## By targeting specific browsers, Babel can do less work so you can ship native ES2015+ 😎!

#### `.babelrc` against a specific chrome version

```json
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": "60"
      }
    }]
  ]
}
```

#### `.babelrc` against current node version

```json
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```

## Some history on babel-preset-env

- [https://twitter.com/samccone/status/722826060161617923](https://twitter.com/samccone/status/722826060161617923)
- [https://gist.github.com/addyosmani/bb6e2939f943226e68e87396c4931040](https://gist.github.com/addyosmani/bb6e2939f943226e68e87396c4931040)
- [Original PR](https://github.com/babel/babel/pull/3476)

Can check the [readme](https://github.com/babel/babel-preset-env) for more information and further docs.
