
<h4>使用 babel-standalone </h4>

```html
<div id="output"></div>
<!-- 加载 Babel -->
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<!-- 你的脚本代码 -->
<script type="text/babel">
const getMessage = () => "Hello World";
document.getElementById('output').innerHTML = getMessage();
</script>
```
