---
layout: docs
title: React inline elements transform
description:
permalink: /docs/plugins/transform-react-inline-elements/
package: babel-plugin-transform-react-inline-elements
---

Converts JSX elements to object literals like `{type: 'div', props: ...}` instead of calls to `React.createElement`.

<blockquote class="babel-callout babel-callout-info">
  <p>
    Note that this requires the global polyfill due to React's use of ES6 <code>Symbol</code> when validating React Elements.
    If <code>Symbol</code> is not present in the browser, your application will fail to render, as Babel will polyfill <code>Symbol</code>
    but React will not have access to that polyfill.

    Therefore, you must require the global polyfill at the entry point to your application:

    <code>require("babel-polyfill");</code>
  </p>
</blockquote>

This transform **should be enabled only in production** (e.g., just before minifying your code) because although they improve runtime performance, they make warning messages more cryptic and skip important checks that happen in development mode, including propTypes.

## Example

**In**

```javascript
<Baz foo="bar"></Baz>;
```

**Out**

```javascript
babelHelpers.jsx(Baz, {
  foo: "bar"
});
```

## Installation

```sh
$ npm install babel-plugin-transform-react-inline-elements
```

## Usage

Add the following line to your `.babelrc`:

```json
{
  "plugins": ["transform-react-inline-elements"]
}
``
