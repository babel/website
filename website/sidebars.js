function bool(value) {
  return value && value !== "false" && value !== "0";
}

module.exports = {
  docs: [
    {
      type: "category",
      label: "Guides",
      items: [
        "index",
        "usage",
        "configuration",
        "learn",
        bool(process.env.BABEL_8_BREAKING) ? "v8-migration" : "v7-migration",
      ],
    },
    {
      type: "category",
      label: "Config Reference",
      items: [
        "config-files",
        "options",
        "plugins",
        "plugins-list",
        "assumptions",
      ],
    },
    {
      type: "category",
      label: "Presets",
      link: {
        type: "doc",
        id: "presets",
      },
      items: [
        {
          type: "category",
          label: "@babel/preset-env",
          link: {
            type: "doc",
            id: "babel-preset-env",
          },
          items: [
            {
              type: "category",
              label: "ES2024",
              items: ["babel-plugin-transform-unicode-sets-regex"],
            },
            {
              type: "category",
              label: "ES2022",
              items: [
                "babel-plugin-transform-class-properties",
                "babel-plugin-transform-class-static-block",
                "babel-plugin-transform-private-methods",
                "babel-plugin-transform-private-property-in-object",
                "babel-plugin-syntax-top-level-await",
              ],
            },
            {
              type: "category",
              label: "ES2021",
              items: [
                "babel-plugin-transform-logical-assignment-operators",
                "babel-plugin-transform-numeric-separator",
              ],
            },
            {
              type: "category",
              label: "ES2020",
              items: [
                "babel-plugin-proposal-dynamic-import",
                "babel-plugin-transform-export-namespace-from",
                "babel-plugin-transform-nullish-coalescing-operator",
                "babel-plugin-transform-optional-chaining",
                "babel-plugin-syntax-bigint",
                "babel-plugin-syntax-dynamic-import",
                "babel-plugin-syntax-import-meta",
              ],
            },
            {
              type: "category",
              label: "ES2019",
              items: [
                "babel-plugin-transform-optional-catch-binding",
                "babel-plugin-transform-json-strings",
              ],
            },
            {
              type: "category",
              label: "ES2018",
              items: [
                "babel-plugin-transform-async-generator-functions",
                "babel-plugin-transform-object-rest-spread",
                "babel-plugin-transform-unicode-property-regex",
                "babel-plugin-transform-dotall-regex",
                "babel-plugin-transform-named-capturing-groups-regex",
              ],
            },
            {
              type: "category",
              label: "ES2017",
              items: ["babel-plugin-transform-async-to-generator"],
            },
            {
              type: "category",
              label: "ES2016",
              items: ["babel-plugin-transform-exponentiation-operator"],
            },
            {
              type: "category",
              label: "ES2015",
              items: [
                "babel-plugin-transform-arrow-functions",
                "babel-plugin-transform-block-scoping",
                "babel-plugin-transform-classes",
                "babel-plugin-transform-computed-properties",
                "babel-plugin-transform-destructuring",
                "babel-plugin-transform-duplicate-keys",
                "babel-plugin-transform-for-of",
                "babel-plugin-transform-function-name",
                "babel-plugin-transform-instanceof",
                "babel-plugin-transform-literals",
                "babel-plugin-transform-new-target",
                "babel-plugin-transform-object-super",
                "babel-plugin-transform-parameters",
                "babel-plugin-transform-shorthand-properties",
                "babel-plugin-transform-spread",
                "babel-plugin-transform-sticky-regex",
                "babel-plugin-transform-template-literals",
                "babel-plugin-transform-typeof-symbol",
                "babel-plugin-transform-unicode-escapes",
                "babel-plugin-transform-unicode-regex",
              ],
            },
            {
              type: "category",
              label: "ES5",
              items: ["babel-plugin-transform-property-mutators"],
            },
            {
              type: "category",
              label: "ES3",
              items: [
                "babel-plugin-transform-member-expression-literals",
                "babel-plugin-transform-property-literals",
                "babel-plugin-transform-reserved-words",
              ],
            },
            {
              type: "category",
              label: "Bugfix",
              items: [
                "babel-plugin-bugfix-safari-id-destructuring-collision-in-function-expression",
                "babel-plugin-bugfix-v8-spread-parameters-in-optional-chaining",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "@babel/preset-react",
          link: {
            type: "doc",
            id: "babel-preset-react",
          },
          items: [
            "babel-plugin-transform-react-jsx",
            "babel-plugin-transform-react-jsx-development",
          ],
        },
        {
          type: "category",
          label: "@babel/preset-typescript",
          link: {
            type: "doc",
            id: "babel-preset-typescript",
          },
          items: ["babel-plugin-transform-typescript"],
        },
        {
          type: "category",
          label: "@babel/preset-flow",
          link: {
            type: "doc",
            id: "babel-preset-flow",
          },
          items: ["babel-plugin-transform-flow-strip-types"],
        },
      ],
    },
    {
      type: "category",
      label: "Misc",
      items: ["roadmap", "caveats", "features-timeline", "faq", "editors"],
    },
    {
      type: "category",
      label: "Integration Packages",
      items: [
        "babel-cli",
        "babel-polyfill",
        "babel-plugin-transform-runtime",
        "babel-register",
        "babel-standalone",
      ],
    },
    {
      type: "category",
      label: "Tooling Packages",
      items: [
        "babel-parser",
        "babel-core",
        "babel-generator",
        "babel-code-frame",
        "babel-runtime",
        "babel-template",
        "babel-traverse",
        "babel-types",
      ],
    },
    {
      type: "category",
      label: "Helper Packages",
      items: [
        "babel-helper-compilation-targets",
        "babel-helper-module-imports",
        "babel-helper-validator-identifier",
        "babel-helper-environment-visitor",
      ],
    },
  ],
  plugins: {
    Modules: [
      "babel-plugin-transform-modules-amd",
      "babel-plugin-transform-modules-commonjs",
      "babel-plugin-transform-modules-systemjs",
      "babel-plugin-transform-modules-umd",
    ],
    "TC39 Proposals": {
      "Stage 3": [
        "babel-plugin-proposal-decorators",
        "babel-plugin-proposal-duplicate-named-capturing-groups-regex",
        "babel-plugin-proposal-explicit-resource-management",
        "babel-plugin-proposal-import-wasm-source",
        "babel-plugin-proposal-json-modules",
        "babel-plugin-proposal-regexp-modifiers",
        "babel-plugin-syntax-import-attributes",
      ],
      "Early stages": [
        "babel-plugin-proposal-async-do-expressions",
        "babel-plugin-proposal-destructuring-private",
        "babel-plugin-proposal-do-expressions",
        "babel-plugin-proposal-export-default-from",
        "babel-plugin-proposal-function-bind",
        "babel-plugin-proposal-function-sent",
        "babel-plugin-proposal-import-defer",
        "babel-plugin-proposal-optional-chaining-assign",
        "babel-plugin-proposal-partial-application",
        "babel-plugin-proposal-pipeline-operator",
        "babel-plugin-proposal-record-and-tuple",
        "babel-plugin-proposal-throw-expressions",
      ],
    },
    "Web Compatibility": [
      "babel-plugin-proposal-import-attributes-to-assertions",
    ],
  },
};
