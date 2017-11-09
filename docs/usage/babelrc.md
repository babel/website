---
layout: docs
title: .babelrc
description: .babelrc 的使用方法
permalink: /docs/usage/babelrc/
---

所有的Babel API 的设置项都不接收回调方法，因为 `.babelrc` 文件会被序列化为 [JSON5](https://github.com/json5/json5)

**例子:**

```json
{
  "plugins": ["transform-react-jsx"],
  "ignore": [
    "foo.js",
    "bar/**/*.js"
  ]
}
```

## 通过 `package.json` 使用 `.babelrc`

您也能在 `package.json` 中如下指定 `.babelrc` 的配置：

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    // my babel config here
  }
}
```

## `env` 选项

在特定环境的时候，您可以用 `env` 选项来设置特定的配置:

```json
{
  "env": {
    "production": {
      "plugins": ["transform-react-constant-elements"]
    }
  }
}
```

特定情景的设置项会被合并、覆盖到没有特定环境的设置项中。

`env` 选项的值将从 `process.env.BABEL_ENV` 获取，如果没有的话，则获取 `process.env.NODE_ENV` 的值，它也无法获取时会设置为  `"development"` 。

您可以通过下面的方法设置环境变量：

**Unix**

命令的第一行：

```sh
BABEL_ENV=production YOUR_COMMAND_HERE
```

或者作为一个单独的命令

```sh
export NODE_ENV=production
```

```sh
您的命令
```

**Windows**

```sh
SET BABEL_ENV=production
```

```sh
您的命令
```

> 如果想让命令跨平台工作，可以使用[`cross-env`](https://www.npmjs.com/package/cross-env)

## 查找行为

Babel 会在正在被转录的文件的当前目录中查找一个 `.babelrc` 文件。 如果不存在，它会遍历目录树，直到找到一个 `.babelrc` 文件，或一个 `package.json` 文件中有 `"babel": {}` 。

在[选项](/docs/usage/api/#options) 中使用 `"babelrc": false` 来停止查找行为，或者提供[`--no-babelrc` CLI 标志](/docs/usage/cli/#babel-ignoring-babelrc)。
