---
id: babel-plugin-transform-react-jsx-compat
title: "@babel/plugin-transform-react-jsx-compat"
sidebar_label: react-jsx-compat
---

## Example

**In**

```js title="JavaScript"
var profile = (
  <div>
    <img src="avatar.png" class="profile" />
    <h3>{[user.firstName, user.lastName].join(" ")}</h3>
  </div>
);
```

**Out**

```js title="JavaScript"
var profile = React.DOM.div(
  null,
  React.DOM.img({ src: "avatar.png", class: "profile" }),
  React.DOM.h3(null, [user.firstName, user.lastName].join(" "))
);
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-react-jsx-compat
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-react-jsx-compat"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-react-jsx-compat script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-react-jsx-compat"],
});
```
