---
layout: docs
title: react
description: How to use the react transformer.
permalink: /docs/advanced/transformers/other/react/
redirect_from:
 - /docs/usage/transformers/other/react/
---

## Example

### React

**In**

```javascript
var profile = <div>
  <img src="avatar.png" class="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

**Out**

```javascript
var profile = React.createElement("div", null,
  React.createElement("img", { src: "avatar.png", "class": "profile" }),
  React.createElement("h3", null, [user.firstName, user.lastName].join(" "))
);
```

### Custom

**In**

```javascript
/** @jsx dom */

var { dom } = require("deku");

var profile = <div>
  <img src="avatar.png" class="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

**Out**

```javascript
/** @jsx dom */

var dom = require("deku").dom;

var profile = dom( "div", null,
  dom("img", { src: "avatar.png", "class": "profile" }),
  dom("h3", null, [user.firstName, user.lastName].join(" "))
);
```
