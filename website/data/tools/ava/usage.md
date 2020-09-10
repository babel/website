Enable Babel support either in `package.json` or `ava.config.*`
```json
{
  "ava": {
    "babel": true
  }
}
```

Note that AVA _always_ adds a few custom Babel plugins when transpiling
your plugins see <a href="https://github.com/avajs/ava/blob/master/docs/03-assertions.md#enhanced-assertion-messages">notes</a>.

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the<a href="https://github.com/avajs/babel">@ava/babel repo</a>.
  </p>
</blockquote>
