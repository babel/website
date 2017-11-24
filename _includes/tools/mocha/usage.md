#### Mocha 4

`--compilers` is deprecated as of Mocha v4.0.0. See [further explanation and workarounds](https://github.com/mochajs/mocha/wiki/compilers-deprecation).

In your `package.json` file make the following changes:

```json
{
  "scripts": {
    "test": "mocha --require babel-register"
  }
}
```

Some features will require a polyfill:

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

With polyfill:

```json
{
  "scripts": {
    "test": "mocha --require babel-polyfill --compilers js:babel-register"
  }
}
```
