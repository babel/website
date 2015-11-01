---
layout: docs
title: React JSX compat transform
description:
permalink: /docs/plugins/transform-react-jsx-compat/
package: babel-plugin-transform-react-jsx-compat
---

Output JSX into pre-v0.12 React syntax.

## Example

**In**

```javascript
var profile = <div>
  <img src="avatar.png" class="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

**Out**

```javascript
var profile = React.DOM.div(null,
  React.DOM.img({ src: "avatar.png", "class": "profile" }),
  React.DOM.h3(null, [user.firstName, user.lastName].join(" "))
);
```

## Installation

```sh
$ npm install babel-plugin-transform-react-jsx-compat
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-react-jsx-compat"]
}
```
