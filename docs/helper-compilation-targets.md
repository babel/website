---
id: babel-helper-compilation-targets
title: @babel/helper-compilation-targets
sidebar_label: helper-compilation-targets
---

`@babel/helper-compilation-targets` is a helper package that works with compilation targets (browsers or other environments like node) and compat tables (knowing what version supports a specific syntax). It is used by `@babel/preset-env` to determine which plugin should be enabled based on the [`targets`](options.md#targets) option.

```javascript
import {
  filterItems,
  default as getTargets,
  isRequired,
} from "@babel/helper-compilation-targets";
```

## filterItems

```typescript
function filterItems(
  list: { [feature: string]: Targets },

  // A set of plugins that should always be included
  includes: Set<string>,

  // A set of plugins that should always be excluded
  excludes: Set<string>,
  targets: Targets,

  // A set of plugins that should always be included if `includes` is empty
  defaultIncludes: Array<string> | null,

  // A set of plugins that should always be excluded if `excludes` is empty
  defaultExcludes?: Array<string> | null,

  // A map from transform plugin to syntax plugin for backward compatibility with older `@babel/parser` versions
  pluginSyntaxMap?: Map<string, string | null>
): Set<string>; // A set of enabled plugins
```

Given a compat data table `list` (i.e. `@babel/compat-data`) and [browser targets](preset-env.md#targets) `targets`, return a set of required plugins.

**Example**

```javascript
const compatData = {
  "transform-feature-1": {
    chrome: "1",
    firefox: "1",
  },
  "transform-feature-2": {
    chrome: "2",
    firefox: "2",
  },
  "transform-feature-3": {
    chrome: "3",
    firefox: "3",
  },
  "transform-feature-4": {
    chrome: "4",
    firefox: "4",
  },
};

// filter a set of plugins required when compiled to chrome 2
// returns new Set(["transform-feature-3", "transform-feature-4"])
filterItems(compatData, new Set(), new Set(), {
  chrome: 2,
});

// filter a set of plugins required when compiled to chrome 2 and firefox 1
// returns new Set(["transform-feature-2", "transform-feature-3", "transform-feature-4"])
filterItems(compatData, new Set(), new Set(), {
  chrome: 2,
  firefox: 1,
});

// always include "transform-feature-2" and exclude "transform-feature-4"
// returns new Set(["transform-feature-2", "transform-feature-3"])
filterItems(
  compatData,
  new Set(["transform-feature-2"]),
  new Set(["transform-feature-4"]),
  {
    chrome: 2,
  }
);

// syntax-feature-2 is required to allow older @babel/parser to parse
// the feature-2 syntax supported in chrome 2

// returns new Set(["syntax-feature-2", "transform-feature-3", "transform-feature-4"])
filterItems(
  compatData,
  new Set(),
  new Set(),
  {
    chrome: 2,
  },
  null,
  null,
  new Map([["transform-feature-2", "syntax-feature-2"]])
);
```

> When a new ES feature reaches stage-4, it will be matured in `@babel/parser`, which means it will always be parsed regardless of the plugin. However we need the syntax plugin for older `@babel/parser`.

## getTargets

```typescript
type GetTargetsOption = {
  // This is not the path of the config file, but the path where start searching it from
  configPath?: string;

  // The path of the config file
  configFile?: string;

  // The env to pass to browserslist
  browserslistEnv?: string;

  // true to disable config loading
  ignoreBrowserslistConfig?: boolean;
};

type InputTargets = {
  ...Targets,

  browsers?: Browsers,

  // When `true`, this completely replaces the `browsers` option.
  // When `intersect`, this is intersected with the `browsers`
  // option (giving the higher browsers as the result).
  esmodules?: boolean | "intersect",
};

function getTargets(
  inputTargets: InputTargets = {},
  options: GetTargetsOption = {}
): Targets;
```

Normalize user specified `targets` to a list of supported targets. See also (`@babel/preset-env`)[preset-env.md#options] for `GetTargetsOption`

**Example**

```javascript
// Return the default compilation targets
// returns {}
getTargets();
```

An empty compilation target is equivalent to [force all transforms](preset-env.md#forceAllTransforms). The default compilation targets will be changed to browserlists query [`defaults, not IE 11`](https://runkit.com/jlhwung/605cd58b2c44c6001a463717) in Babel 8.

One can also query the compilation targets with ES Module support, like [`@vue/babel-preset-app`](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) did in order to provide a set of modern targets.

```javascript
/* returns {
  "android": "61.0.0",
  "chrome": "61.0.0",
  "edge": "16.0.0",
  "firefox": "60.0.0",
  "ios": "10.3.0",
  "node": "13.2.0",
  "opera": "48.0.0",
  "safari": "10.1.0",
  "samsung": "8.2.0",
} */
getTargets({
  esmodules: true,
});
```

Note: The ES Module compat data is generated from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#browser_compatibility).

## isRequired

```typescript
function isRequired(
  name: string,
  targets: Targets,
  {
    compatData = pluginsCompatData,
    includes,
    excludes,
  }: {
    compatData?: { [feature: string]: Targets };
    includes?: Set<string>;
    excludes?: Set<string>;
  } = {}
): boolean;
```

Given browser targets `targets`, query the `compatData` whether plugin `name` is required for compilation. When `compatData` is not specified, the default data source is `@babel/compat-data`

**Example**

```javascript
// babel.config.js
module.exports = api => {
  const targets = api.targets();
  // The targets have native optional chaining support
  // if `proposal-optional-chaining` is _not_ required
  const optionalChainingSupported = !isRequired(
    "proposal-optional-chaining",
    targets
  );
};
```

Plugin authors can use `isRequired` to optimize plugin output given different `targets`:

```javascript
// a naive plugin replace `a.b` to `a != null && a.b`
module.exports = api => {
  const targets = api.targets();
  // The targets have native optional chaining support
  // if `proposal-optional-chaining` is _not_ required
  const optionalChainingSupported = !isRequired(
    "proposal-optional-chaining",
    targets
  );
  const visited = new WeakSet();
  return {
    visitor: {
      MemberExpression(path) {
        if (path.matchesPattern("a.b")) {
          if (visited.has(path.node)) return;
          visited.add(path.node);
          if (optionalChainingSupported) {
            // When optional chaining is supported,
            // output `a?.b` instead of `a != null && a.b`
            path.replaceWith(api.templates`a?.b`);
          } else {
            path.replaceWith(api.templates`a != null && ${path.node}`);
          }
        }
      },
    },
  };
};
```

[`@babel/plugin-proposal-object-rest-spread`](https://github.com/babel/babel/blob/962d81483ef6a57a4a3eca8230ae40795b695147/packages/babel-plugin-proposal-object-rest-spread/src/index.js#L23) uses `isRequired` to determine whether targets already have native `Object.assign` support.
