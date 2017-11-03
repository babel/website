虽然你 _可以_ 在你的机器上全局安装 Babel CLI, 但根据单个项目进行**本地**安装会更好一些。

这样做有两个主要的原因：

1. 同一机器上的不同的项目可以依赖不同版本的 Babel, 这允许你一次更新一个项目。
2. 这意味着在你的工作环境中没有隐含的依赖项。它将使你的项目更方便移植、更易于安装。

我们可以通过以下命令本地安装 Babel CLI:

```sh
npm install --save-dev babel-cli
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    <strong>注意：</strong> 如果你没有一个 <code>package.json</code>,
    在安装之前请新建一个。这可以保证
    <code>npx</code> 命令产生合适的交互。
  </p>
</blockquote>

在完成安装之后，你的 `package.json` 文件应该包括：

```diff
{
  "devDependencies": {
+   "babel-cli": "^6.0.0"
  }
}
```
