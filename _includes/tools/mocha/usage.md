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
    "test": "mocha --require babel-polyfill babel-register"
  }
}
```
