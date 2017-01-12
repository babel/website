In your `package.json` file make the following changes:

```json
{
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "scriptPreprocessor": "<rootDir>/node_modules/babel-jest",
    "testFileExtensions": ["es6", "js"],
    "moduleFileExtensions": ["js", "json", "es6"]
  }
}
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the <a href="https://github.com/babel/babel-jest">babel/babel-jest repo</a>.
  </p>
</blockquote>

