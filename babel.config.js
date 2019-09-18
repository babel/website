"use strict";

module.exports = function(api) {
  const env = api.env();
  api.cache.using(() => env);

  const plugins = ["@babel/plugin-proposal-class-properties"];

  if (env === "production") {
    plugins.push("emotion");
  } else if (env === "development" || !env) {
    plugins.push(["emotion", { sourceMap: true }]);
  }

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "entry",
          corejs: 3,
          shippedProposals: true,
          targets: {
            // This is browserslist defaults
            browsers: ["> 0.5%", "last 2 versions", "Firefox ESR", "not dead"],
          },
        },
      ],
      "@babel/preset-flow",
      "@babel/preset-react",
    ],
    plugins,
  };
};
