In your `package.json` file make the following changes:

```js
{
  "scripts": {
    "test": "mocha --compilers js:babel-register"
  }
}
```

Some features will require a polyfill:

```bash
$ npm install --save-dev babel-polyfill
```

```js
{
  "scripts": {
    "test": "mocha --require babel-polyfill --compilers js:babel-register"
  }
}
```
