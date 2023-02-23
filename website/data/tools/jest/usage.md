In your `package.json` file make the following changes:

```json title="JSON"
{
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  }
}
```

<blockquote class="alert alert--info">
  <p>
    For more information see the <a href="https://github.com/facebook/jest/tree/master/packages/babel-jest">babel-jest repo</a>.
  </p>
</blockquote>

