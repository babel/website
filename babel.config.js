"use strict";

module.exports = function (api) {
  api.cache(true);
  return {
    targets: {
      // This is browserslist defaults
      browsers: ["> 0.5%", "last 2 versions", "Firefox ESR", "not dead"],
    },
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "entry",
          corejs: require("core-js/package.json").version,
          shippedProposals: true,
        },
      ],
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
          development: process.env.NODE_ENV === "development",
        },
      ],
      [
        "@babel/preset-typescript",
        {
          onlyRemoveTypeImports: true,
        },
      ],
    ],
    env: {
      production: {
        plugins: ["@emotion"],
      },
      development: {
        plugins: [["@emotion", { sourceMap: true }]],
      },
    },
  };
};
