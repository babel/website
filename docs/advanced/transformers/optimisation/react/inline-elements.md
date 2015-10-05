---
layout: docs
title: optimisation.react.inlineElements
description: How to use the optimisation.react.inlineElements transformer.
permalink: /docs/advanced/transformers/optimisation/react/inline-elements/
redirect_from:
 - /docs/usage/transformers/optimisation/react/inline-elements/
---

Converts JSX elements to object literals like `{type: 'div', props: ...}` instead of calls to `React.createElement`.

This transform **should be enabled only in production** (e.g., just before minifying your code) because although they improve runtime performance, they make warning messages more cryptic and skip important checks that happen in development mode, including propTypes.

## Usage

```javascript
require("babel").transform("code", { optional: ["optimisation.react.inlineElements"] });
```

```sh
$ babel --optional optimisation.react.inlineElements script.js
```

## Example

**In**

```javascript
var profile = <Profile key={key}, userName={userName} profilePicture={profilePicture} />;
```

**Out**

```javascript
var profile = {
  $$typeof: _typeOfReactElement,
  type: Profile,
  key: key,
  ref: null,
  props: {
    userName: userName,
    profilePicture: profilePicture
  },
  _owner: null
};
```
