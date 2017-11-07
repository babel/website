在你的 `package.json` 文件做出如下改动：

```json
{
  "scripts": {
    "babel-node": "babel-node --presets=/*a*/ --ignore='foo|bar|baz'"
  }
}
```

然后通过以下命令调用你的脚本：

```sh
nodemon --exec npm run babel-node -- path/to/script.js
```

#### 参数警告

使用 babel-node 调用 nodemon 时如果忘记使用双短划线，可能会导致错误地分析参数。 使用npm-scripts 来防止这一点。 如果您选择跳过使用 npm-scripts 脚本，它可以表示为：

```sh
nodemon --exec babel-node --presets=es2015 --ignore='foo\|bar\|baz' -- path/to/script.js
```
