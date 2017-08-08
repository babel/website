// @flow

export type PluginConfig = {
  baseUrl?: string,
  isPreLoaded?: boolean,
  label: string,
  package: string,
  version?: string
};

export type PluginConfigs = Array<PluginConfig>;

export type PluginState = {
  config: PluginConfig,
  didError: boolean,
  isEnabled: boolean,
  isLoaded: boolean,
  isLoading: boolean,
  plugin: any
};

export type PluginStateMap = { [name: string]: PluginState };

export type CompileConfig = {
  evaluate: boolean,
  presets: Array<string>,
  prettify: boolean
};

export type PersistedState = {
  babili: boolean,
  browsers: string,
  builtIns: boolean,
  code: string,
  debug: boolean,
  evaluate: boolean,
  lineWrap: boolean,
  presets: string,
  prettier: boolean,
  targets: string
};
