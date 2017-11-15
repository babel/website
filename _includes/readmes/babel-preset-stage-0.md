# babel-preset-stage-0

> 包含 stage 0 特性的一组插件的 Babel preset。

## 安装

```sh
npm install --save-dev babel-preset-stage-0
```

## 使用

### 通过 `.babelrc` 文件 (推荐)

**.babelrc**

```json
{
  "presets": ["stage-0"]
}
```

### 通过 CLI

```sh
babel script.js --presets stage-0
```

### 通过 Node API

```javascript
require("babel-core").transform("code", {
  presets: ["stage-0"]
});
```
