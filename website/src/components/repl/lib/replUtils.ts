import { envPresetDefaults, replDefaults } from "./pluginConfig";
import StorageService from "./storageService";
import UriUtils from "./uriUtils";
import { compareVersions } from "./utils";

import type {
  BabelState,
  BabelPlugin,
  EnvState,
  EnvConfig,
  PresetsOptions,
  ReplState,
  MultiPackagesConfig,
  PluginConfig,
  PluginConfigs,
  PluginState,
  PluginStateMap,
  ShippedProposalsState,
  BabelPresets,
  SupportedFileExtension,
  SourceType,
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

//  Repl state stored in Local storage
const loadPersistedState = (): ReplState => {
  const storageState = StorageService.get("replState");
  return {
    ...replDefaults,
    ...storageState,
    // HACK: We don't want to load the Babel version from the
    // localStorage, otherwise users will use an old version
    // unless they manually "update" it explicitly loading a
    // new one via https://babeljs.io/repl/version/7.3.0
    version: "",
  };
};

//  Repl state in query string
const urlState = (): ReplState => {
  const queryState = UriUtils.parseQuery();
  return { ...replDefaults, ...queryState };
};

export const replState = (): ReplState => {
  const hasQueryString = window.location.hash;
  return hasQueryString ? urlState() : loadPersistedState();
};

type DefaultPlugins = {
  [name: string]: boolean;
};

export const persistedStateToBabelState = (
  persistedState: ReplState,
  config: PluginConfig
): BabelState => ({
  availablePresets: [],
  build: persistedState.build,
  didError: false,
  isLoaded: false,
  isLoading: true,
  version: persistedState.version,
  config,
});

export const persistedStateToEnvState = (
  persistedState: ReplState,
  config: PluginConfig,
  isEnabled: boolean
): EnvState => {
  return {
    ...persistedStateToBabelState(persistedState, config),
    isLoading: isEnabled,
    isEnabled,
  };
};

export const persistedStateToShippedProposalsState = (
  persistedState: ReplState,
  config: MultiPackagesConfig,
  isEnabled: boolean
): ShippedProposalsState => ({
  config,
  isLoading: false,
  isLoaded: false,
  didError: false,
  isEnabled,
});

export const pluginConfigArrayToStateMap = (
  pluginConfigs: PluginConfigs,
  defaults: DefaultPlugins = {}
): PluginStateMap =>
  pluginConfigs.reduce((reduced, config) => {
    reduced[config.package || config.label] = pluginConfigToState(
      config,
      defaults[config.package || config.label] === true
    );
    return reduced;
  }, {});

export const pluginConfigToState = (
  config: PluginConfig,
  isEnabled: boolean = false
): PluginState => ({
  config,
  didError: false,
  isEnabled,
  isLoaded: config.isPreLoaded === true,
  isLoading: false,
  plugin: null,
  options: null,
});

export const persistedStateToPresetsOptions = (
  persistedState: ReplState
): PresetsOptions => {
  const decoratorsVersion =
    // support old REPL state
    persistedState.decoratorsLegacy
      ? "legacy"
      : persistedState.decoratorsVersion;
  const decoratorsLegacy = decoratorsVersion === "legacy";
  return {
    decoratorsVersion,
    decoratorsBeforeExport:
      !decoratorsLegacy && !!persistedState.decoratorsBeforeExport,
    pipelineProposal: persistedState.pipelineProposal || "hack",
    reactRuntime: persistedState.reactRuntime || "automatic",
  };
};

export const persistedStateToEnvConfig = (
  persistedState: ReplState
): EnvConfig => {
  const isEnvPresetEnabled =
    !!persistedState.presets &&
    persistedState.presets.split(",").indexOf("env") >= 0;

  const envConfig: EnvConfig = {
    browsers: persistedState.browsers,
    electron: persistedState.electron ?? envPresetDefaults.electron.default,
    isEnvPresetEnabled,
    isElectronEnabled: false,
    isNodeEnabled: false,
    modules: persistedState.modules ?? envPresetDefaults.modules.default,
    forceAllTransforms: !!persistedState.forceAllTransforms,
    shippedProposals: !!persistedState.shippedProposals,
    isBuiltInsEnabled: !!persistedState.builtIns,
    isSpecEnabled: !!persistedState.spec,
    isLooseEnabled: !!persistedState.loose,
    isBugfixesEnabled: !!persistedState.bugfixes,
    node: envPresetDefaults.node.default,
    version: persistedState.version,
    builtIns: persistedState.builtIns ?? envPresetDefaults.builtIns.default,
    corejs: persistedState.corejs ?? envPresetDefaults.corejs.default,
  };
  let parsedAssumptions = {};
  try {
    parsedAssumptions = persistedState.assumptions
      ? JSON.parse(decodeURIComponent(persistedState.assumptions))
      : {};
  } catch (err) {
    console.error("Error parsing assumptions", err);
  }
  envConfig.assumptions = parsedAssumptions;
  decodeURIComponent(persistedState.targets)
    .split(",")
    .forEach((component) => {
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

export const persistedStateToExternalPluginsState = (
  persistedState: ReplState
): Array<BabelPlugin> => {
  const { externalPlugins } = persistedState;
  if (!externalPlugins) {
    return [];
  }
  return externalPlugins.split(",").map((plugin) => {
    const separator = plugin.lastIndexOf("@");
    const name = plugin.slice(0, separator);
    const version = plugin.slice(separator + 1);
    return { name, version };
  });
};

export function provideDefaultOptionsForPresets(
  preset: string,
  presetEnvOptions: any,
  presetsOptions: PresetsOptions,
  version: string
) {
  if (preset === "env") {
    return ["env", presetEnvOptions];
  }
  if (
    version &&
    compareVersions(version, "8.0.0") < 0 &&
    preset === "typescript"
  ) {
    return [
      "typescript",
      {
        allowDeclareFields: true,
        allowNamespaces: true,
      },
    ];
  }

  if (/^stage-[0-3]$/.test(preset)) {
    const version = presetsOptions.decoratorsVersion;
    const decoratorsLegacy = version === "legacy" || undefined;

    const decoratorsBeforeExport = [
      "legacy",
      "2022-03",
      "2023-01",
      "2023-05",
      "2023-11",
    ].includes(version)
      ? undefined
      : presetsOptions.decoratorsBeforeExport;

    return [
      preset,
      {
        // pass decoratorsLegacy for Babel < 7.17
        decoratorsLegacy,
        decoratorsVersion: decoratorsLegacy ? undefined : version,
        decoratorsBeforeExport,
        pipelineProposal: presetsOptions.pipelineProposal,
      },
    ];
  }
  if (preset === "react") {
    return [
      "react",
      {
        runtime: presetsOptions.reactRuntime,
      },
    ];
  }
  return preset;
}

export function provideDefaultOptionsForExternalPlugins(
  pluginName,
  babelVersion
) {
  switch (pluginName) {
    case "@babel/plugin-proposal-decorators": {
      if (compareVersions(babelVersion, "7.24.0") >= 0) {
        return { version: "2023-11" };
      } else if (compareVersions(babelVersion, "7.22.0") >= 0) {
        return { version: "2023-05" };
      } else if (compareVersions(babelVersion, "7.21.0") >= 0) {
        return { version: "2023-01" };
      } else if (compareVersions(babelVersion, "7.19.0") >= 0) {
        return { version: "2022-03" };
      } else if (compareVersions(babelVersion, "7.17.0") >= 0) {
        return { version: "2021-12" };
      } else if (compareVersions(babelVersion, "7.0.0") >= 0) {
        return { version: "2018-09", decoratorsBeforeExport: true };
      }
    }
    case "@babel/plugin-proposal-discard-binding": {
      return { syntaxType: "void" };
    }
    case "@babel/plugin-proposal-optional-chaining-assign": {
      return { version: "2023-07" };
    }
    case "@babel/plugin-proposal-pipeline-operator": {
      if (compareVersions(babelVersion, "7.15.0") >= 0) {
        return { proposal: "hack", topicToken: "%" };
      } else {
        return { proposal: "minimal" };
      }
    }
    default:
      return {};
  }
}

export function presetsToArray(presets: PluginStateMap): BabelPresets {
  return Object.keys(presets)
    .filter((key) => presets[key].isEnabled && presets[key].isLoaded)
    .map((key) => presets[key].config.label);
}

function guessFileExtension(presets: BabelPresets): SupportedFileExtension {
  let ext = ".js";
  if (presets.includes("typescript")) {
    ext = ".ts";
  }
  if (presets.includes("react")) {
    ext = (ext + "x") as any;
  }
  return ext as SupportedFileExtension;
}

export function buildTransformOpts(
  version: string,
  sourceType: SourceType,
  sourceMap: boolean,
  plugins: any[],
  presets: PluginStateMap,
  presetsOptions: PresetsOptions,
  envConfig: EnvConfig,
  evaluate: boolean
) {
  const presetsArray = presetsToArray(presets);

  let useBuiltIns: false | "entry" | "usage" = false;
  let corejs = "3.42";

  let presetEnvOptions: {
    targets: any;
    modules: any;
    forceAllTransforms: boolean;
    shippedProposals: boolean;
    useBuiltIns: false | "entry" | "usage";
    corejs: string;
    spec?: boolean;
    loose?: boolean;
    bugfixes?: boolean;
  };

  if (envConfig?.isEnvPresetEnabled) {
    let targets: any = {};
    const { forceAllTransforms, shippedProposals, modules } = envConfig;

    if (envConfig.browsers) {
      targets.browsers = envConfig.browsers;
    }
    if (envConfig.isElectronEnabled) {
      targets.electron = envConfig.electron;
    }
    if (envConfig.isNodeEnabled) {
      targets.node = envConfig.node;
    }
    if (Object.keys(targets).length === 1 && targets.browsers) {
      targets = envConfig.browsers;
    }
    if (envConfig.isBuiltInsEnabled) {
      useBuiltIns = (!evaluate && envConfig.builtIns) as
        | false
        | "entry"
        | "usage";
      if (envConfig.corejs) {
        corejs = envConfig.corejs;
      }
    }

    presetEnvOptions = {
      targets,
      modules,
      forceAllTransforms,
      shippedProposals,
      useBuiltIns,
      corejs: undefined,
    };

    if (version && compareVersions(version, "8.0.0") === -1) {
      presetEnvOptions.spec = envConfig.isSpecEnabled;
      presetEnvOptions.loose = envConfig.isLooseEnabled;
    }

    if (useBuiltIns) {
      presetEnvOptions.corejs = corejs;
    }

    if (
      envConfig.isBugfixesEnabled &&
      version &&
      compareVersions(version, "7.9.0") !== -1 &&
      compareVersions(version, "8.0.0") < 0
    ) {
      presetEnvOptions.bugfixes = envConfig.isBugfixesEnabled;
    }
  }

  const babelConfig = {
    filename: "repl" + guessFileExtension(presetsArray),
    sourceMap: sourceMap,
    presets: presetsArray.map((name) => {
      return presets[name].options
        ? [name, presets[name].options]
        : provideDefaultOptionsForPresets(
            name,
            presetEnvOptions,
            presetsOptions,
            version
          );
    }),
    plugins: plugins,
    sourceType,
  };

  if (version && compareVersions(version, "7.13.0") >= 0) {
    (babelConfig as any).assumptions = envConfig?.assumptions ?? {};
  }

  return babelConfig;
}

export function stateToConfig(
  version: string,
  sourceType: SourceType,
  plugins: BabelPlugin[],
  presets: PluginStateMap,
  envConfig: EnvConfig,
  presetsOptions: PresetsOptions
) {
  const config = buildTransformOpts(
    version,
    sourceType,
    undefined,
    plugins.map((plugin) => [
      plugin.version ? plugin.name + "@" + plugin.version : plugin.name,
      plugin.options ??
        provideDefaultOptionsForExternalPlugins(plugin.name, version),
    ]),
    presets,
    presetsOptions,
    envConfig,
    undefined
  ) as any;
  const presetEnvOptions = config.presets?.find(
    (preset) => preset[0] === "env"
  )?.[1];
  if (presetEnvOptions) {
    const defaults = {
      forceAllTransforms: false,
      shippedProposals: false,
      useBuiltIns: false,
      spec: false,
      loose: false,
    };
    Object.keys(presetEnvOptions).forEach((key) => {
      if (presetEnvOptions[key] === defaults[key]) {
        delete presetEnvOptions[key];
      }
    });
  }

  if (!config?.presets.length) {
    delete config.presets;
  }
  if (!config?.plugins.length) {
    delete config.plugins;
  }
  if (config.assumptions && Object.keys(config.assumptions).length === 0) {
    delete config.assumptions;
  }
  return config;
}
