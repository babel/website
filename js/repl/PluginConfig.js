// @flow

import type { PluginConfig } from "./types";

const envPresetConfig: PluginConfig = {
  label: "Env Preset",
  package: "babel-preset-env-standalone",
  version: "0",
};

const envPresetDefaults = {
  browsers: {
    placeholder: "> 2%, ie 11, safari > 9",
  },
  electron: {
    min: 0.3,
    default: 1.5,
    step: 0.1,
  },
  node: {
    min: 0.1,
    default: 7.4,
    step: 0.1,
  },
};

const runtimePolyfillConfig: PluginConfig = {
  label: "Runtime Poylfill",
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

const presetPluginConfigs: Array<PluginConfig> = [
  {
    label: "es2015",
    isPreLoaded: true,
  },
  {
    label: "es2015-loose",
    isPreLoaded: true,
  },
  {
    label: "es2016",
    isPreLoaded: true,
  },
  {
    label: "es2017",
    isPreLoaded: true,
  },
  {
    label: "react",
    isPreLoaded: true,
  },
  {
    label: "stage-0",
    isPreLoaded: true,
  },
  {
    label: "stage-1",
    isPreLoaded: true,
  },
  {
    label: "stage-2",
    isPreLoaded: true,
  },
  {
    label: "stage-3",
    isPreLoaded: true,
  },
];

export {
  envPresetConfig,
  envPresetDefaults,
  pluginConfigs,
  presetPluginConfigs,
  runtimePolyfillConfig,
};
