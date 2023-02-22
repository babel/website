To include it you will need to require it at the top of the **entry point**
to your application.

```js title="JavaScript"
require("@babel/register");
```

If you are using ES6's `import` syntax in your application's **entry point**, you
should instead import at the top of the **entry point** to ensure it is loaded first:

```js title="JavaScript"
import "@babel/register";
```

All subsequent files required by node with the extensions `.es6`, `.es`, `.jsx` and `.js` will be transformed by Babel. The polyfill specified in [polyfill](/docs/usage/polyfill/) is also automatically required.

<blockquote class="alert alert--warning">
  <h4>Not suitable for libraries</h4>
  <p>
    The require hook automatically hooks itself into <strong>all</strong> node requires. This will pollute the global scope and introduce conflicts. Because of this it's not suitable for libraries, if however you're writing an application then it's completely fine to use.
  </p>
</blockquote>

<blockquote class="alert alert--warning">
  <h4>Not meant for production use</h4>
  <p>
    The require hook is primarily recommended for simple cases.
  </p>
</blockquote>

<blockquote class="alert alert--info">
  <p>
    For full documentation on the Babel require hook see the <a href="/docs/usage/require/">usage docs</a>.
  </p>
</blockquote>
