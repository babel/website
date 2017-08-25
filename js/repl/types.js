// @flow

export type BabelPresets = Array<string | Array<string | Object>>;

export type EnvConfig = {
  browsers: string,
  electron: ?number,
  isEnvPresetEnabled: boolean,
  isElectronEnabled: boolean,
  isNodeEnabled: boolean,
  node: ?number,
};

export type LoadScriptCallback = (success: boolean) => void;

export type PluginConfig = {
  baseUrl?: string,
  isPreLoaded?: boolean,
  label: string,
  package: string,
  version?: string,
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
  version: string,
};

export type PluginState = LazyLoadedState & {
  config: PluginConfig,
  isEnabled: boolean,
  plugin: any,
};

export type PluginStateMap = { [name: string]: PluginState };

export type CompileConfig = {
  evaluate: boolean,
  presets: BabelPresets,
  prettify: boolean,
  sourceMap: boolean,
};

export type PersistedState = {
  babili: boolean,
  browsers: string,
  build: string,
  builtIns: boolean,
  circleciRepo: string,
  code: string,
  debug: boolean,
  evaluate: boolean,
  lineWrap: boolean,
  presets: string,
  prettier: boolean,
  showSidebar: boolean,
  targets: string,
  version: string,
};

type BabelPresetTargetsMap = {
  [key: string]: number,
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
