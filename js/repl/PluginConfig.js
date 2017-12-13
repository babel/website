// @flow
import camelCase from "lodash.camelcase";
import type { PluginConfig, MultiPackagesConfig, EnvFeatures } from "./types";

const convertPluginNameToInsanceName = pluginName =>
  `_babel_${camelCase(`plugin-${pluginName}`)}`;

const babelConfig: PluginConfig = {
  label: "Babel",
  package: "babel-standalone",
  version: "6",
  baseUrl: "https://unpkg.com",
  instanceName: "Babel",
};

const envPresetConfig: PluginConfig = {
  label: "Env Preset",
  package: "babel-preset-env-standalone",
  version: "1.6.2",
  baseUrl: "https://unpkg.com",
  versionKey: "envVersion",
  instanceName: "babelPresetEnv",
};

const stage3Plugins: Array<PluginConfig> = [
  "proposal-async-generator-functions",
  "proposal-object-rest-spread",
  "proposal-optional-catch-binding",
  "proposal-unicode-property-regex",
].map(pluginName => {
  const packageName = `@babel/plugin-${pluginName}`;
  return {
    label: pluginName,
    package: packageName,
    version: "7.0.0-beta.34",
    baseUrl: "https://bundle.run",
    instanceName: convertPluginNameToInsanceName(pluginName),
  };
});

const shippedProposalsConfig: MultiPackagesConfig = {
  baseUrl: "https://bundle.run",
  label: "Shipped Proposals",
  packages: stage3Plugins,
  package: "",
  version: "7",
};

const envPresetFeaturesSupport: EnvFeatures = {
  debug: [0, 1],
  builtInsUsage: [2, 7],
  forceAllTransforms: [2, 7],
  shippedProposals: [2, 7],
  stringifiedVersion: [2, 7],
};

const envPresetDefaults = {
  browsers: {
    placeholder: "> 2%, ie 11, safari > 9",
  },
  electron: {
    min: 0.3,
    default: "1.5",
    step: 0.1,
  },
  node: {
    min: 0.1,
    default: "7.4",
    step: 0.1,
  },
  builtIns: {
    default: "usage",
  },
};

const runtimePolyfillConfig: PluginConfig = {
  label: "Runtime Polyfill",
  package: "babel-polyfill",
  version: "6",
};

const pluginConfigs: Array<PluginConfig> = [
  {
    baseUrl: "https://unpkg.com",
    label: "Minify",
    package: "babili-standalone", // TODO Switch to babel-minify-standalone
    version: "0",
  },
];

export {
  babelConfig,
  envPresetConfig,
  shippedProposalsConfig,
  envPresetDefaults,
  envPresetFeaturesSupport,
  pluginConfigs,
  runtimePolyfillConfig,
};
