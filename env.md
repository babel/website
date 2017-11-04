---
layout: docs
title: babel-preset-es2015 -> babel-preset-env
permalink: /env/
---

> 我们非常 😸 高兴你正在使用 ES2015 语法，但不是继续每年度的 preset, 团队推荐使用 babel-preset-env. 默认情况下，他和之前的 preset 将 ES2015+ 编译到 ES5 具有相同的行为。
> 查看 [v1.x readme 以获得更多信息](https://github.com/babel/babel-preset-env/tree/1.x)。 (对于 Babel 7, 我们将 preset 移动到了 [main babel repo](https://github.com/babel/babel/tree/master/experimental/babel-preset-env)).

## 升级到 `babel-preset-env`

### 安装

```sh
npm install babel-preset-env --save-dev
```

#### `.babelrc` 基本变化

```diff
{
+  "presets": ["env"]
-  "presets": ["es2015"]
}
```

#### `.babelrc` 带选项的变化

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

`babel-preset-env` 是一个新的 preset, 一年前首次发布，取代了之前用过的很多 preset, 其中包括：

- `babel-preset-es2015`, `babel-preset-es2016`, `babel-preset-es2017`
- `babel-preset-latest`
- 其他社区插件涉及到 `es20xx`:
  - `babel-preset-node5`, `babel-preset-es2015-node`, 等等

## 针对特定浏览器，Babel 可以最更少的工作使你可以传输原生 ES2015+ 代码😎!

#### `.babelrc` 针对一个特定 chrome 版本

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

#### `.babelrc` 针对当前 node 版本

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

## babel-preset-env 的一些历史

- [https://twitter.com/samccone/status/722826060161617923](https://twitter.com/samccone/status/722826060161617923)
- [https://gist.github.com/addyosmani/bb6e2939f943226e68e87396c4931040](https://gist.github.com/addyosmani/bb6e2939f943226e68e87396c4931040)
- [原始 PR](https://github.com/babel/babel/pull/3476)

查看 [readme](https://github.com/babel/babel-preset-env) 获得更多信息以及更详细的文档。
