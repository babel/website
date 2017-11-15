---
layout: docs
title: CLI
description: 如何使用 CLI 工具。
permalink: /docs/usage/cli/
package: babel-cli
---

<p class="lead">
  Babel 内置一个 CLI，可通过命令行操作来编译文件。
</p>

## 安装

{% include tools/babel_cli/install.md %}

## babel

<blockquote class="babel-callout babel-callout-info">
  <p>
    <strong>注意：</strong> 以下操作多采用  
    <a href="https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b">npx</a>
    命令来运行本地安装的可执行文件。 你可以将其放在 <a href="https://docs.npmjs.com/cli/run-script">npm run script</a> 中，也可以改为使用相对路径执行 <code>./node_modules/.bin/babel</code>
  </p>
</blockquote>

### 编译文件

编译 `script.js` 并**输出到 stdout**

```sh
npx babel script.js
# output...
```
如果你想**输出编译结果到单个文件**，你可以使用 `--out-file` 或  `-o`。

```sh
npx babel script.js --out-file script-compiled.js
```

想要在**修改文件后**编译文件，请使用 `--watch` 或 `-w` 选项：

```sh
npx babel script.js --watch --out-file script-compiled.js
```

### 编译并输出 Source Map 文件
如果你想添加 **source map 文件** 你可以用 `--source-maps` 或者 `-s`。[了解更多关于 source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)

```sh
npx babel script.js --out-file script-compiled.js --source-maps
```
如果你想使用 **内联的 source map**，你可以使用 `--source-maps inline`。

```sh
npx babel script.js --out-file script-compiled.js --source-maps inline
```

### 编译目录

编译整个 `src` 目录并将其输出到 `lib` 目录。 你可以使用 `--out-dir` 或 `-d`。 这不会覆盖 `lib` 中的任何其他文件或目录。

```sh
npx babel src --out-dir lib
```
编译整个 `src ` 目录并将其输出到单个文件中。

```sh
npx babel src --out-file script-compiled.js
```

### 忽略文件

忽略 spec 和 test 文件

```sh
npx babel src --out-dir lib --ignore spec.js,test.js
```

### 复制文件

复制不需要编译的文件

```sh
npx babel src --out-dir lib --copy-files
```

### 使用管道符

通过管道符读取文件并编译输出到 `script-compiled.js`

```sh
npx babel --out-file script-compiled.js < script.js
```

### 使用插件

使用 `--plugins` 选项来指定编译中要使用的插件

```sh
npx babel script.js --out-file script-compiled.js --plugins=transform-runtime,transform-es2015-modules-amd
```

### 使用 Presets

使用 `--presets` 选项指定编译中要使用的插件

```sh
npx babel script.js --out-file script-compiled.js --presets=es2015,react
```

### 忽略 .babelrc 文件

忽略项目中 .babelrc 文件的配置并使用 cli 选项，例如

```sh
npx babel --no-babelrc script.js --out-file script-compiled.js --presets=es2015,react
```

### 高级用法

在 babel CLI 中还有更多选项可用，请参阅 [options](/docs/usage/api/#options)， `babel --help` 以及其他章节了解更多信息。

## babel-node

<blockquote class="babel-callout babel-callout-warning">
  <h4>不建议在生产环境下直接使用</h4>
  <p>
  你不应该在生产环境中使用 <code>babel-node</code>，编译中的缓存数据存储在内存中，会造成不必要的内存占用过高。而整个应用程序需要即时编译，你会一直面临应用启动的性能问题。
  </p>
  <p>
  查看示例<a href="https://github.com/babel/example-node-server"> Node.js server with Babel</a>，了解如何在生产部署中使用 Babel
  </p>
</blockquote>
<blockquote class="babel-callout babel-callout-info">
  <h4>ES6 风格的模块加载无法正常工作</h4>
  <p>
  由于技术上的限制，<code>babel-node REPL</code> 中不完全支持 ES6 风格的模块加载。
  </p>
</blockquote>

babel 提供了第二个 CLI，其功能与 Node.js 的 CLI 完全相同，只是它会在运行之前编译 ES6 代码。

启动 REPL (Read-Eval-Print-Loop)。

```sh
npx babel-node
```

执行字符串格式的代码。

```sh
npx babel-node -e "class Test { }"
```
编译并运行 `test.js`。

```sh
npx babel-node test
```

> **提示**：使用 `rlwrap` 获取具有输入历史记录的 REPL
>
> ```sh
> npx rlwrap babel-node
> ```
>
> 在某些平台（如OSX）上， `rlwrap` 可能需要额外的参数才能正常工作，例如：
>
> ```sh
> NODE_NO_READLINE=1 npx rlwrap --always-readline babel-node
> ```

### 使用

```sh
babel-node [options] [ -e script | script.js ] [arguments]
```
当用户脚本的参数名称与 node 中的原生参数选项冲突时，可以在脚本名称之前加双破折号来避免歧义

```sh
npx babel-node --debug --presets es2015 -- script.js --debug
```

### 选项

| 选项                   | Default              | 描述                     |
| ------------------------ | -------------------- | ------------------------------- |
| `-e, --eval [script]`    |                      | 执行字符串格式的代码                 |
| `-p, --print`            |                      | 执行字符串格式的代码并且打印结果 |
| `-i, --ignore [regex]`   | `node_modules`       | 使用 require hook 时，忽略与此正则表达式匹配的所有文件 |
| `-x, --extensions`       | `".js",".jsx",".es6",".es"` | 可识别的拓展名列表 |
| `--presets`                | `[]`                 | 加载和使用以逗号分隔的 [presets](/docs/plugins/#presets) （一组插件）。 |
| `--plugins`                | `[]`                 | 加载和使用以逗号分隔的 [plugins](/docs/plugins/) 列表。
