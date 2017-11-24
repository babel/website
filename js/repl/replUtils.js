// @flow

import { envPresetDefaults } from "./PluginConfig";
import StorageService from "./StorageService";
import UriUtils from "./UriUtils";

import type {
  BabelPresetEnvResult,
  BabelState,
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
    builtIns: merged.builtIns === true,
    circleciRepo: merged.circleciRepo || "",
    code: merged.code || "",
    debug: merged.debug === true,
    spec: merged.spec != null ? merged.spec : false,
    loose: merged.loose != null ? merged.loose : true,
    evaluate: merged.evaluate === true,
    isEnvPresetTabExpanded: merged.isEnvPresetTabExpanded === true,
    isPresetsTabExpanded: merged.isPresetsTabExpanded === true,
    isSettingsTabExpanded: merged.isSettingsTabExpanded !== false, // Default to show
    lineWrap: merged.lineWrap != null ? merged.lineWrap : true,
    presets: merged.hasOwnProperty("presets") ? merged.presets : null,
    prettier: merged.prettier === true,
    showSidebar: merged.showSidebar !== false, // Default to show
    targets: merged.targets || "",
    version: merged.version || "",
  };
};

type DefaultPlugins = { [name: string]: boolean };

export const persistedStateToBabelState = (
  persistedState: PersistedState
): BabelState => ({
  availablePresets: [],
  build: persistedState.build,
  circleciRepo: persistedState.circleciRepo,
  didError: false,
  isLoaded: false,
  isLoading: true,
  version: persistedState.version,
});

export const configArrayToStateMap = (
  pluginConfigs: PluginConfigs,
  defaults: DefaultPlugins = {}
): PluginStateMap =>
  pluginConfigs.reduce((reduced, config) => {
    reduced[config.package || config.label] = configToState(
      config,
      defaults[config.package || config.label] === true
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
    Array.isArray(persistedState.presets) &&
    persistedState.presets.indexOf("env") > 0;

  const envConfig: EnvConfig = {
    browsers: persistedState.browsers,
    electron: envPresetDefaults.electron.default,
    isEnvPresetEnabled,
    isElectronEnabled: false,
    isNodeEnabled: false,
    node: envPresetDefaults.node.default,
  };

  decodeURIComponent(persistedState.targets)
    .split(",")
    .forEach(component => {
      try {
        const pieces = component.split("-");
        const name = pieces[0].toLowerCase();
        const value = parseFloat(pieces[1]);

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

  if (result.modulePlugin) {
    debugInfo.push(`Using modules transform:\n  ${result.modulePlugin}`);
  }

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
