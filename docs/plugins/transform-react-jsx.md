---
layout: docs
title: React JSX transform
description:
permalink: /docs/plugins/transform-react-jsx/
package: babel-plugin-transform-react-jsx
---

## Example

### React

**In**

```javascript
var profile = <div>
  <img src="avatar.png" className="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

**Out**

```javascript
var profile = React.createElement("div", null,
  React.createElement("img", { src: "avatar.png", className: "profile" }),
  React.createElement("h3", null, [user.firstName, user.lastName].join(" "))
);
```

### Custom

**In**

```javascript
/** @jsx dom */

var { dom } = require("deku");

var profile = <div>
  <img src="avatar.png" className="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

**Out**

```javascript
/** @jsx dom */

var dom = require("deku").dom;

var profile = dom( "div", null,
  dom("img", { src: "avatar.png", className: "profile" }),
  dom("h3", null, [user.firstName, user.lastName].join(" "))
);
```

## Installation

```sh
$ npm install babel-plugin-transform-react-jsx
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-react-jsx"]
}
```

or optionally specify a `jsxPragma`:

```json
{
  "plugins": [
    ["transform-react-jsx", { "jsxPragma": "dom" }]
  ]
}
```
