// @flow

export type BabelPresets = Array<string | Array<string | Object>>;

export type EnvConfig = {
  browsers: string,
  electron: ?string,
  isEnvPresetEnabled: boolean,
  isElectronEnabled: boolean,
  isBuiltInsEnabled: boolean,
  isNodeEnabled: boolean,
  builtIns: string | false,
  version: string,
  node: ?string,
};

export type LoadScriptCallback = (success: boolean) => void;

export type PluginConfig = {
  baseUrl?: string,
  isPreLoaded?: boolean,
  label: string,
  package: string,
  version?: string,
  fromMonorepo?: boolean,
  instanceName?: string,
};

export type PluginConfigs = Array<PluginConfig>;

export type LazyLoadedState = {
  didError: boolean,
  isLoaded: boolean,
  isLoading: boolean,
};

export type BabelState = LazyLoadedState & {
  build: string,
  errorMessage?: string,
  circleciRepo: string,
  config: PluginConfig,
  version: string,
};

export type EnvState = {
  build: string,
  errorMessage?: string,
  circleciRepo: string,
  config: PluginConfig,
  version: string,
  isEnabled: boolean,
};

export type PluginState = LazyLoadedState & {
  config: PluginConfig,
  isEnabled: boolean,
};

export type PluginStateMap = { [name: string]: PluginState };

export type CompileConfig = {
  debugEnvPreset: boolean,
  envConfig: ?EnvConfig,
  evaluate: boolean,
  presets: BabelPresets,
  sourceMap: boolean,
};

export type PersistedState = {
  babili: boolean,
  browsers: string,
  build: string,
  builtIns: boolean | string,
  circleciRepo: string,
  code: string,
  debug: boolean,
  evaluate: boolean,
  isEnvPresetTabExpanded: boolean,
  isPresetsTabExpanded: boolean,
  isSettingsTabExpanded: boolean,
  lineWrap: boolean,
  presets: ?string,
  showSidebar: boolean,
  targets: string,
  version: string,
  envVersion: string,
};

type BabelPresetTargetsMap = {
  [key: string]: string,
};

type BabelNamedPresetAndTarget = {
  name: string,
  targets: BabelPresetTargetsMap,
};

export type BabelPresetEnvResult = {
  modulePlugin: string,
  polyfills: ?Array<string>,
  polyfillsWithTargets: ?Array<BabelNamedPresetAndTarget>,
  targets: BabelPresetTargetsMap,
  transformations: Array<string>,
  transformationsWithTargets: Array<BabelNamedPresetAndTarget>,
};
