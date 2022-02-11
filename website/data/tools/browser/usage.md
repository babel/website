
<h4>With @babel/standalone</h4>

```html
<div id="output"></div>
<!-- Load Babel -->
<!-- v6 <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script> -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<!-- Your custom script here -->
<script type="text/babel">
const getMessage = () => "Hello World";
document.getElementById('output').innerHTML = getMessage();
</script>
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <a href="/docs/en/babel-standalone">docs</a> for full documentation on <code>@babel/standalone</code>.
  </p>
</blockquote>
