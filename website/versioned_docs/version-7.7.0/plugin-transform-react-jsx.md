---
id: version-7.7.0-babel-plugin-transform-react-jsx
title: @babel/plugin-transform-react-jsx
sidebar_label: transform-react-jsx
original_id: babel-plugin-transform-react-jsx
---

## Example

### React

**In**

```javascript
const profile = (
  <div>
    <img src="avatar.png" className="profile" />
    <h3>{[user.firstName, user.lastName].join(' ')}</h3>
  </div>
);
```

**Out**

```javascript
const profile = React.createElement("div", null,
  React.createElement("img", { src: "avatar.png", className: "profile" }),
  React.createElement("h3", null, [user.firstName, user.lastName].join(" "))
);
```

### Custom

**In**

```javascript
/** @jsx Preact.h */

import Preact from 'preact';

const profile = (
  <div>
    <img src="avatar.png" className="profile" />
    <h3>{[user.firstName, user.lastName].join(' ')}</h3>
  </div>
);
```

**Out**

```javascript
/** @jsx Preact.h */

import Preact from 'preact';

const profile = Preact.h("div", null,
  Preact.h("img", { src: "avatar.png", className: "profile" }),
  Preact.h("h3", null, [user.firstName, user.lastName].join(" "))
);
```

### Fragments

Fragments are a feature available in React 16.2.0+.

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
const descriptions = items.map(item => React.createElement(
  React.Fragment,
  null,
  React.createElement("dt", null, item.name),
  React.createElement("dd", null, item.value)
));
```

#### Custom

**In**

```javascript
/** @jsx Preact.h */
/** @jsxFrag Preact.Fragment */

import Preact from 'preact';

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

import Preact from 'preact';

var descriptions = items.map(item => Preact.h(
  Preact.Fragment,
  null,
  Preact.h("dt", null, item.name),
  Preact.h("dd", null, item.value)
));
```

Note that if a custom pragma is specified, then a custom fragment pragma must also be specified if the `<></>` is used. Otherwise, an error will be thrown.

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
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "Preact.h", // default pragma is React.createElement
      "pragmaFrag": "Preact.Fragment", // default is React.Fragment
      "throwIfNamespace": false // defaults to true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-react-jsx script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-react-jsx"]
});
```

## Options

### `pragma`

`string`, defaults to `React.createElement`.

Replace the function used when compiling JSX expressions.

Note that the `@jsx React.DOM` pragma has been deprecated as of React v0.12

### `pragmaFrag`

`string`, defaults to `React.Fragment`.

Replace the component used when compiling JSX fragments.

### `useBuiltIns`

`boolean`, defaults to `false`.

When spreading props, use `Object.assign` directly instead of Babel's extend helper.

### `useSpread`

`boolean`, defaults to `false`.

When spreading props, use inline object with spread elements directly instead of Babel's extend helper or `Object.assign`.

### `throwIfNamespace`

`boolean`, defaults to `true`.

Toggles whether or not to throw an error if an XML namespaced tag name is used. For example:

    <f:image />

Though the JSX spec allows this, it is disabled by default since React's JSX does not currently have support for it.

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
