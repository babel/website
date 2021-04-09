---
id: babel-plugin-transform-react-jsx
title: @babel/plugin-transform-react-jsx
sidebar_label: React Plugin
---

> **NOTE**: This plugin is included in `@babel/preset-react`

## Example

### React Automatic Runtime

Automatic runtime is a feature added in `v7.9.0`. With this runtime enabled, the functions that JSX compiles to will be imported automatically.

**In**

```javascript
const profile = (
  <div>
    <img src="avatar.png" className="profile" />
    <h3>{[user.firstName, user.lastName].join(" ")}</h3>
  </div>
);
```

**Out**

```javascript
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const profile = _jsxs("div", {
  children: [
    _jsx("img", {
      src: "avatar.png",
      className: "profile",
    }),
    _jsx("h3", {
      children: [user.firstName, user.lastName].join(" "),
    }),
  ],
});
```

#### Customizing the Automatic Runtime Import

**In**

```javascript
/** @jsxImportSource custom-jsx-library */

const profile = (
  <div>
    <img src="avatar.png" className="profile" />
    <h3>{[user.firstName, user.lastName].join(" ")}</h3>
  </div>
);
```

**Out**

```javascript
import { jsx as _jsx } from "custom-jsx-library/jsx-runtime";
import { jsxs as _jsxs } from "custom-jsx-library/jsx-runtime";

const profile = _jsxs("div", {
  children: [
    _jsx("img", {
      src: "avatar.png",
      className: "profile",
    }),
    _jsx("h3", {
      children: [user.firstName, user.lastName].join(" "),
    }),
  ],
});
```

**In**

```javascript
/** @jsxRuntime classic */

const profile = (
  <div>
    <img src="avatar.png" className="profile" />
    <h3>{[user.firstName, user.lastName].join(" ")}</h3>
  </div>
);
```

**Out**

```javascript
const profile = React.createElement(
  "div",
  null,
  React.createElement("img", { src: "avatar.png", className: "profile" }),
  React.createElement("h3", null, [user.firstName, user.lastName].join(" "))
);
```

### React Classic Runtime

If you do not want (or cannot use) auto importing, you can use the classic runtime, which is the default behavior for v7 and prior.

**In**

```javascript
const profile = (
  <div>
    <img src="avatar.png" className="profile" />
    <h3>{[user.firstName, user.lastName].join(" ")}</h3>
  </div>
);
```

**Out**

```javascript
const profile = React.createElement(
  "div",
  null,
  React.createElement("img", { src: "avatar.png", className: "profile" }),
  React.createElement("h3", null, [user.firstName, user.lastName].join(" "))
);
```

#### Customizing the Classic Runtime Import

**In**

```javascript
/** @jsx Preact.h */

import Preact from "preact";

const profile = (
  <div>
    <img src="avatar.png" className="profile" />
    <h3>{[user.firstName, user.lastName].join(" ")}</h3>
  </div>
);
```

**Out**

```javascript
/** @jsx Preact.h */

import Preact from "preact";

const profile = Preact.h(
  "div",
  null,
  Preact.h("img", { src: "avatar.png", className: "profile" }),
  Preact.h("h3", null, [user.firstName, user.lastName].join(" "))
);
```

### Fragments

[Fragments](https://reactjs.org/docs/fragments.html) are a feature available in React 16.2.0+.

#### React

**In**

```javascript
const descriptions = items.map(item => (
  <>
    <dt>{item.name}</dt>
    <dd>{item.value}</dd>
  </>
));
```

**Out**

```javascript
const descriptions = items.map(item =>
  React.createElement(
    React.Fragment,
    null,
    React.createElement("dt", null, item.name),
    React.createElement("dd", null, item.value)
  )
);
```

#### Customizing with the Classic Runtime

**In**

```javascript
/** @jsx Preact.h */
/** @jsxFrag Preact.Fragment */

import Preact from "preact";

var descriptions = items.map(item => (
  <>
    <dt>{item.name}</dt>
    <dd>{item.value}</dd>
  </>
));
```

**Out**

```javascript
/** @jsx Preact.h */
/** @jsxFrag Preact.Fragment */

import Preact from "preact";

var descriptions = items.map(item =>
  Preact.h(
    Preact.Fragment,
    null,
    Preact.h("dt", null, item.name),
    Preact.h("dd", null, item.value)
  )
);
```

Note that if a custom pragma is specified, then a custom fragment pragma must also be specified if the fragment sytnax `<></>` is used. Otherwise, an error will be thrown.

## Installation

```sh
npm install --save-dev @babel/plugin-transform-react-jsx
```

## Usage

### With a configuration file (Recommended)

Without options:

```json
{
  "plugins": ["@babel/plugin-transform-react-jsx"]
}
```

With options:

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "throwIfNamespace": false, // defaults to true
        "runtime": "automatic", // defaults to classic
        "importSource": "custom-jsx-library" // defaults to react
      }
    ]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-react-jsx script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-react-jsx"],
});
```

## Options

### Both Runtimes

#### `throwIfNamespace`

`boolean`, defaults to `true`.

Toggles whether or not to throw an error if an XML namespaced tag name is used. For example:

    <f:image />

Though the JSX spec allows this, it is disabled by default since React's JSX does not currently have support for it.

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)

#### `runtime`

`classic | automatic`, defaults to `classic`

Added in: `v7.9.0`

Decides which runtime to use.

`automatic` auto imports the functions that JSX transpiles to. `classic` does not automatically import anything.

### React Automatic Runtime

#### importSource

`string`, defaults to `react`.

Added in: `v7.9.0`

Replaces the import source when importing functions.

### React Classic Runtime

#### `pragma`

`string`, defaults to `React.createElement`.

Replace the function used when compiling JSX expressions.

Note that the `@jsx React.DOM` pragma has been deprecated as of React v0.12

#### `pragmaFrag`

`string`, defaults to `React.Fragment`.

Replace the component used when compiling JSX fragments.

### `useBuiltIns`

`boolean`, defaults to `false`.

When spreading props, use `Object.assign` directly instead of Babel's extend helper.

### `useSpread`

`boolean`, defaults to `false`.

When spreading props, use inline object with spread elements directly instead of Babel's extend helper or `Object.assign`.
