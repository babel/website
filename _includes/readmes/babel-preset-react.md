# babel-preset-react

> 为所有 React 插件服务的 Babel preset.

这个 preset 包含如下插件/preset:

- [preset-flow](https://babeljs.io/docs/plugins/preset-flow/)
- [syntax-jsx](https://babeljs.io/docs/plugins/syntax-jsx/)
- [transform-react-jsx](https://babeljs.io/docs/plugins/transform-react-jsx/)
- [transform-react-display-name](https://babeljs.io/docs/plugins/transform-react-display-name/)

## 安装

> 你也可以参阅 React [上手页面](https://facebook.github.io/react/docs/hello-world.html)

> 查看更多信息，请查阅 [cli](/docs/setup/) 的构建页面和[使用](/docs/usage/cli/)文档。

安装 CLI 和该 preset

```sh
npm install --save-dev babel-cli babel-preset-react
```

用该 preset 生成一个 .babelrc 配置文件

```sh
echo '{ "presets": ["react"] }' > .babelrc
```

运行如下代码生成一个文件：

```sh
echo '<h1>Hello, world!</h1>' > index.js
```

查看输出

```sh
./node_modules/.bin/babel index.js
```

## 使用方法

### 通过 `.babelrc` 方式（推荐）

**.babelrc**

```json
{
  "presets": ["react"]
}
```

### 通过 CLI 方式

```sh
babel script.js --presets react 
```

### 通过 Node API 方式

```javascript
require("babel-core").transform("code", {
  presets: ["react"]
});
```
