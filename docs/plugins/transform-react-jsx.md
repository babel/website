---
layout: docs
title: React JSX transform
description: Turn JSX into React function calls.
permalink: /docs/plugins/transform-react-jsx/
package: babel-plugin-transform-react-jsx
---

Turn JSX into React function calls

> You can also use React without using Babel: [React Without JSX](https://facebook.github.io/react/docs/react-without-jsx.html)

One way to do this is by manually writing `React.createElement`, or aliasing it to something like `$`

```js
const React = require("react");
const ReactDOM = require("react-dom");
const $ = React.createElement;

ReactDOM.render(
  $("div", null, "Hello World"), // <div>Hello World</div>
  document.getElementById("root")
);
```

Also checkout [WTF is JSX](https://jasonformat.com/wtf-is-jsx/) for an explanation of the syntax and how it's just a sugar for function calls.

{% include package_readme.html %}
