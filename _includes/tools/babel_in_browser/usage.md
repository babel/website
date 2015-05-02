Add the `type="text/babel"` attribute to your `<script>` tags. For example:

```html
<script src="node_modules/babel-core/browser.js"></script>
<script type="text/babel">
class Test {
  test() {
    return "test";
  }
}

var test = new Test;
test.test(); // "test"
</script>
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For full documentation on browser compilation see the <a href="/docs/usage/browser/">usage docs</a>.
  </p>
</blockquote>
