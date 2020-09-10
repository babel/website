In your `package.json` file make the following changes:

```json
{
  "scripts": {
    "babel-node": "babel-node --presets='@babel/preset-env' --ignore='foo|bar|baz'"
  }
}
```

Then call your script with:

```sh
nodemon --exec npm run babel-node -- path/to/script.js
```

#### Arguments caveat

Calling nodemon with babel-node may lead to arguments getting parsed incorrectly if you forget to use a double dash. Using npm-scripts helpers prevent this. If you chose to skip using npm-scripts, it can be expressed as:

```sh
nodemon --exec babel-node --presets=@babel/preset-env --ignore='foo\|bar\|baz' -- path/to/script.js
```
