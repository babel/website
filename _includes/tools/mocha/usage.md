In your `package.json` file make the following changes:

```json
{
  "scripts": {
    "test": "mocha --compilers js:babel-register"
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
    "test": "mocha --require babel-polyfill --compilers js:babel-register"
  }
}
```
