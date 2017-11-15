#### Mocha 4

从 Mocha v4.0.0 开始，不推荐使用 `--compilers`. 请参阅 [进一步解释和解决办法](https://github.com/mochajs/mocha/wiki/compilers-deprecation)。

在你的 `package.json` 文件中做如下变化：

```json
{
  "scripts": {
    "test": "mocha --require babel-register"
  }
}
```

有些特性需要一个 polyfill:

```sh
npm install --save-dev babel-polyfill
```

```json
{
  "scripts": {
    "test": "mocha --require babel-polyfill --require babel-register"
  }
}
```

#### Mocha 3


```json
{
  "scripts": {
    "test": "mocha --compilers js:babel-register"
  }
}
```

通过 polyfill:

```json
{
  "scripts": {
    "test": "mocha --require babel-polyfill --compilers js:babel-register"
  }
}
```
