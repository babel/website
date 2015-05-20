---
layout: docs
title: reactCompat
description: How to use the reactCompat transformer.
permalink: /docs/advanced/transformers/other/react-compat/
redirect_from:
 - /docs/usage/transformers/other/react-compat/
---

Output JSX into pre-v0.12 React syntax.

## Usage

```javascript
require("babel").transform("code", { optional: ["reactCompat"] });
```

```sh
$ babel --optional reactCompat script.js
```

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
