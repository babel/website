使用它你需要在应用程序的**入口起点**顶部引入 Babel 。

```javascript
require("babel-register");
```

如果你在应用程序中使用 ES6 的 `import` 语法，
你则需要在**入口起点**的顶部引入 Babel ，以确保它优先加载:

```javascript
import "babel-register";
```

所有以 `.es6`， `.es`， `.jsx` 和 `.js` 扩展名为后缀的文件都能被 Babel 转译。 特殊的 polyfill 自然也需要引入特殊的 [polyfill](/docs/usage/polyfill/) 。

<blockquote class="babel-callout babel-callout-warning">
  <h4>不适合在库中使用</h4>
  <p>
    Require hook 会自动钩住<strong>所有</strong>节点需要的钩子。这将污染全局作用域，引发未知冲突。正因如此，它不适合在库中使用，但你如果正在编写一个应用程序，那么使用它就完全没问题。
  </p>
</blockquote>

<blockquote class="babel-callout babel-callout-warning">
  <h4>不适合用于生产环境下</h4>
  <p>
    Require hook 主要推荐用于简单的情况下。
  </p>
</blockquote>

<blockquote class="babel-callout babel-callout-info">
  <p>
    关于 Babel Require hook 的完整文档，请查看<a href="/docs/usage/require/">usage docs</a>.
  </p>
</blockquote>
