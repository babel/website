// @flow
import camelCase from "lodash.camelcase";
import type { PluginConfig, MultiPackagesConfig, ReplState } from "./types";

const normalizePluginName = pluginName =>
  `_babel_${camelCase(`plugin-${pluginName}`)}`;

const babelConfig: PluginConfig = {
  label: "Babel",
  package: "@babel/standalone",
  version: "^7.0.0",
  baseUrl: "https://unpkg.com",
  instanceName: "Babel",
};

const envPresetConfig: PluginConfig = {
  label: "Env Preset",
  package: "@babel/preset-env-standalone",
  version: "^7.0.0",
  baseUrl: "https://unpkg.com",
  instanceName: "babelPresetEnv",
};

/* Some of stage-3 plugins have been added to @babel/standalone gradually. If a new
 * shippedProposal is added, add it to this list.
 */
const shippedProposalsPackages: Array<PluginConfig> = [
  // "proposal-async-generator-functions",
  // "proposal-object-rest-spread",
  // "proposal-optional-catch-binding",
  // "proposal-unicode-property-regex",
].map(pluginName => {
  const packageName = `@babel/plugin-${pluginName}`;
  return {
    label: pluginName,
    package: packageName,
    baseUrl: "https://bundle.run",
    instanceName: normalizePluginName(pluginName),
  };
});

const shippedProposalsConfig: MultiPackagesConfig = {
  baseUrl: "https://bundle.run",
  label: "Shipped Proposals",
  packages: shippedProposalsPackages,
  package: "",
};

const envPresetDefaults = {
  browsers: {
    placeholder: "defaults, not ie 11, not ie_mob 11",
  },
  electron: {
    min: 0.3,
    default: "1.8",
    step: 0.1,
  },
  node: {
    min: 0.1,
    default: "10.13",
    step: 0.1,
  },
  builtIns: {
    default: "usage",
  },
  corejs: {
    default: "3.21",
  },
};

const runtimePolyfillConfig: PluginConfig = {
  label: "Runtime Polyfill",
  package: "@babel/polyfill",
  url: 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.12.1/polyfill.min.js',
};

const pluginConfigs: Array<PluginConfig> = [
  {
    baseUrl: "https://unpkg.com",
    label: "Prettify",
    package: "prettier",
    version: "2",
    files: ["standalone.js", "parser-babel.js"],
  },
];

const replDefaults: ReplState = {
  browsers: "defaults, not ie 11, not ie_mob 11",
  bugfixes: true,
  build: "",
  builtIns: false,
  spec: false,
  loose: false,
  circleciRepo: "",
  code: "",
  debug: false,
  evaluate: false,
  fileSize: false,
  timeTravel: false,
  sourceType: "module",
  forceAllTransforms: false,
  isEnvPresetTabExpanded: false,
  isPluginsExpanded: false,
  isPresetsTabExpanded: false,
  isSettingsTabExpanded: true,
  lineWrap: true,
  meta: {
    compiledSize: 0,
    rawSize: 0,
  },
  presets: "react,stage-2,env",
  prettier: false,
  showSidebar: true,
  shippedProposals: false,
  targets: "",
  version: "",
  reactRuntime: "classic",
  decoratorsVersion: "2021-12",
  decoratorsBeforeExport: false,
  pipelineProposal: "minimal",
  externalPlugins: "",
};

export {
  babelConfig,
  envPresetConfig,
  shippedProposalsConfig,
  envPresetDefaults,
  pluginConfigs,
  runtimePolyfillConfig,
  replDefaults,
};
