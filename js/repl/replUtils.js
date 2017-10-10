// @flow

import { envPresetDefaults } from "./PluginConfig";
import StorageService from "./StorageService";
import UriUtils from "./UriUtils";

import type {
  BabelPresetEnvResult,
  BabelState,
  EnvState,
  EnvConfig,
  PersistedState,
  PluginConfig,
  PluginConfigs,
  PluginState,
  PluginStateMap,
} from "./types";

export const envConfigToTargetsString = (envConfig: EnvConfig): string => {
  const components = [];

  if (envConfig.isElectronEnabled && envConfig.electron) {
    components.push(`Electron-${envConfig.electron}`);
  }

  if (envConfig.isNodeEnabled && envConfig.node) {
    components.push(`Node-${envConfig.node}`);
  }

  return encodeURIComponent(components.join(","));
};

export const loadPersistedState = (): PersistedState => {
  const storageState = StorageService.get("replState");
  const queryState = UriUtils.parseQuery();
  const merged = {
    ...storageState,
    ...queryState,
  };

  return {
    babili: merged.babili === true,
    browsers: merged.browsers || "",
    build: merged.build || "",
    builtIns: merged.builtIns || false,
    circleciRepo: merged.circleciRepo || "",
    code: merged.code || "",
    debug: merged.debug === true,
    forceAllTransforms: merged.forceAllTransforms === true,
    evaluate: merged.evaluate === true,
    isEnvPresetTabExpanded: merged.isEnvPresetTabExpanded === true,
    isPresetsTabExpanded: merged.isPresetsTabExpanded === true,
    isSettingsTabExpanded: merged.isSettingsTabExpanded !== false, // Default to show
    lineWrap: merged.lineWrap != null ? merged.lineWrap : true,
    presets: merged.hasOwnProperty("presets") ? merged.presets : null,
    showSidebar: merged.showSidebar !== false, // Default to show
    targets: merged.targets || "",
    version: merged.version || "",
    envVersion: merged.envVersion || "",
  };
};

type DefaultPlugins = { [name: string]: boolean };

export const persistedStateToBabelState = (
  persistedState: PersistedState,
  config: PluginConfig
): BabelState => ({
  build: persistedState.build,
  circleciRepo: persistedState.circleciRepo,
  didError: false,
  isLoaded: false,
  isLoading: true,
  version: persistedState.version,
  config,
});

export const persistedStateToEnvState = (
  persistedState: PersistedState,
  config: PluginConfig,
  isEnabled: boolean
): EnvState => ({
  ...persistedStateToBabelState(persistedState, config),
  isLoading: false,
  isEnabled,
  version: persistedState.envVersion,
});

export const configArrayToStateMap = (
  pluginConfigs: PluginConfigs,
  defaults: DefaultPlugins = {}
): PluginStateMap =>
  pluginConfigs.reduce((reduced, config) => {
    reduced[config.package] = configToState(
      config,
      defaults[config.package] === true
    );
    return reduced;
  }, {});

export const configToState = (
  config: PluginConfig,
  isEnabled: boolean = false
): PluginState => ({
  config,
  didError: false,
  isEnabled,
  isLoaded: config.isPreLoaded === true,
  isLoading: false,
  plugin: null,
});

export const persistedStateToEnvConfig = (
  persistedState: PersistedState
): EnvConfig => {
  const isEnvPresetEnabled =
    typeof persistedState.presets === "string" &&
    persistedState.presets.indexOf("env") >= 0;

  const envConfig: EnvConfig = {
    browsers: persistedState.browsers,
    electron: envPresetDefaults.electron.default,
    isEnvPresetEnabled,
    isElectronEnabled: false,
    isNodeEnabled: false,
    forceAllTransforms: !!persistedState.forceAllTransforms,
    isBuiltInsEnabled: !!persistedState.builtIns,
    node: envPresetDefaults.node.default,
    version: persistedState.envVersion,
    builtIns: envPresetDefaults.builtIns.default,
  };

  decodeURIComponent(persistedState.targets)
    .split(",")
    .forEach(component => {
      try {
        const pieces = component.split("-");

        const name = pieces[0].toLowerCase();
        const value = pieces[1];

        if (name) {
          switch (name) {
            case "electron":
              envConfig.electron = value;
              envConfig.isElectronEnabled = true;
              break;
            case "node":
              envConfig.node = value;
              envConfig.isNodeEnabled = true;
              break;
            default:
              console.warn(`Unknown env target "${name}" specified`);
              break;
          }
        }
      } catch (error) {
        console.error("Error parsing env preset configuration", error);
      }
    });

  return envConfig;
};

export const getDebugInfoFromEnvResult = (
  result: BabelPresetEnvResult
): string => {
  const debugInfo = [];

  const targetNames = Object.keys(result.targets);
  if (targetNames.length) {
    debugInfo.push(
      "Using targets:\n" +
        targetNames.map(name => `• ${name}: ${result.targets[name]}`).join("\n")
    );
  }

  if (result.transformationsWithTargets.length) {
    debugInfo.push(
      "Using plugins:\n" +
        result.transformationsWithTargets
          .map(item => `• ${item.name}`)
          .join("\n")
    );
  }

  // This property will only be set if we compiled with useBuiltIns=true
  if (result.polyfillsWithTargets && result.polyfillsWithTargets.length) {
    debugInfo.push(
      "Using polyfills:\n" +
        result.polyfillsWithTargets.map(item => `• ${item.name}`).join("\n")
    );
  }

  return debugInfo.join("\n\n");
};
