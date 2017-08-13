// @flow

import { css } from 'glamor';
import React from 'react';
import CodeMirrorPanel from './CodeMirrorPanel';
import ReplOptions from './ReplOptions';
import StorageService from './StorageService';
import UriUtils from './UriUtils';
import compile from './compile';
import loadPlugin from './loadPlugin';
import {
  envPresetConfig,
  pluginConfigs,
  presetPluginConfigs,
  runtimePolyfillConfig
} from './PluginConfig';
import {
  envConfigToTargetsString,
  loadPersistedState,
  configArrayToStateMap,
  configToState,
  persistedStateToEnvConfig
} from './replUtils';
import { media } from './styles';

import type {
  BabelPresets,
  EnvConfig,
  PluginState,
  PluginStateMap
} from './types';

type Props = {};
type State = {
  builtIns: boolean,
  code: string,
  compiled: ?string,
  compileError: ?Error,
  envConfig: EnvConfig,
  envPresetState: PluginState,
  evalError: ?Error,
  isSidebarExpanded: boolean,
  lineWrap: boolean,
  plugins: PluginStateMap,
  presets: PluginStateMap,
  runtimePolyfillState: PluginState
};

// TODO Show env plugins list (based on current settings) if debug is enabled

export default class Repl extends React.Component {
  static defaultProps = {
    defaultValue: ''
  };

  props: Props;
  state: State;

  _numLoadingPlugins = 0;

  constructor(props: Props, context: any) {
    super(props, context);

    const persistedState = loadPersistedState();

    const defaultPlugins = {
      'babili-standalone': persistedState.babili,
      prettier: persistedState.prettier
    };

    const defaultPresets = (persistedState.presets || 'es2015,react,stage-2')
      .split(',')
      .reduce((reduced, key) => {
        reduced[`babel-preset-${key}`] = true;
        return reduced;
      }, {});

    const envConfig = persistedStateToEnvConfig(persistedState);

    const state = {
      builtIns: persistedState.builtIns,
      code: persistedState.code,
      compiled: null,
      compileError: null,
      envConfig,
      envPresetState: configToState(
        envPresetConfig,
        envConfig.isEnvPresetEnabled
      ),
      evalError: null,
      isSidebarExpanded: persistedState.showSidebar,
      lineWrap: persistedState.lineWrap,
      plugins: configArrayToStateMap(pluginConfigs, defaultPlugins),
      presets: configArrayToStateMap(presetPluginConfigs, defaultPresets),
      runtimePolyfillState: configToState(
        runtimePolyfillConfig,
        persistedState.evaluate
      )
    };

    this.state = {
      ...state,
      ...this._compile(persistedState.code, state)
    };

    // Load any plug-ins enabled by query params
    this._checkForUnloadedPlugins();
  }

  render() {
    const state = this.state;

    const options = {
      lineWrapping: state.lineWrap
    };

    return (
      <div className={styles.repl}>
        <ReplOptions
          builtIns={state.builtIns}
          className={styles.optionsColumn}
          envConfig={state.envConfig}
          envPresetState={state.envPresetState}
          isExpanded={state.isSidebarExpanded}
          lineWrap={state.lineWrap}
          pluginState={state.plugins}
          presetState={state.presets}
          runtimePolyfillConfig={runtimePolyfillConfig}
          runtimePolyfillState={state.runtimePolyfillState}
          toggleEnvPresetSetting={this._toggleEnvPresetSetting}
          toggleIsExpanded={this._toggleIsSidebarExpanded}
          toggleSetting={this._toggleSetting}
        />

        <div className={styles.panels}>
          <CodeMirrorPanel
            className={styles.codeMirrorPanel}
            code={state.code}
            error={state.compileError}
            onChange={this._updateCode}
            options={options}
            placeholder="Write code here"
          />
          <CodeMirrorPanel
            className={styles.codeMirrorPanel}
            code={state.compiled}
            error={state.evalError}
            options={options}
          />
        </div>
      </div>
    );
  }

  _checkForUnloadedPlugins() {
    const {
      envConfig,
      envPresetState,
      plugins,
      runtimePolyfillState
    } = this.state;

    // Assume all default presets are baked into babel-standalone.
    // We really only need to worry about plugins.
    for (const key in plugins) {
      const plugin = plugins[key];

      if (plugin.isEnabled && !plugin.isLoaded && !plugin.isLoading) {
        this._numLoadingPlugins++;

        loadPlugin(plugin, success => {
          this._numLoadingPlugins--;

          if (!success) {
            this.setState(state => ({
              plugins
            }));
          }

          // Once all plugins have been loaded, re-compile code.
          if (this._numLoadingPlugins === 0) {
            this._updateCode(this.state.code);
          }
        });
      }
    }

    // Babel (runtime) polyfill is large;
    // It's only needed if we're actually executing the compiled code.
    // Defer loading it unless "evaluate" is enabled.
    if (runtimePolyfillState.isEnabled && !runtimePolyfillState.isLoaded) {
      loadPlugin(runtimePolyfillState, () => {
        let evalError = null;

        // No need to recompile at this point;
        // Just evaluate the most recently compiled code.
        try {
          // eslint-disable-next-line
          eval(this.state.compiled);
        } catch (error) {
          evalError = error;
        }

        // Re-render (even if no error) to update the label loading-state.
        this.setState({ evalError });
      });
    }

    // Babel 'env' preset is large;
    // Only load it if it's been requested.
    if (envConfig.isEnvPresetEnabled && !envPresetState.isLoaded) {
      loadPlugin(envPresetState, () => {
        // This preset is not built into Babel standalone due to its size.
        // Before we can use it we need to explicitly register it.
        window.Babel.registerPreset('env', envPresetState.plugin.default);

        this._updateCode(this.state.code);
      });
    }
  }

  _compile = (code: string, state: State) => {
    const { envConfig } = state;

    const presetsArray = this._presetsToArray(state);

    const babili = state.plugins['babili-standalone'];
    if (babili.isEnabled && babili.isLoaded) {
      presetsArray.push('babili');
    }

    if (envConfig.isEnvPresetEnabled && state.envPresetState.isLoaded) {
      const targets = {};
      if (envConfig.browsers) {
        targets.browsers = envConfig.browsers
          .split(',')
          .map(value => value.trim())
          .filter(value => value);
      }
      if (envConfig.isElectronEnabled) {
        targets.electron = envConfig.electron;
      }
      if (envConfig.isNodeEnabled) {
        targets.node = envConfig.node;
      }

      const envOptions = {
        useBuiltIns: !state.evaluate && state.builtIns,
        targets
      };

      presetsArray.push(['env', envOptions]);
    }

    return compile(code, {
      evaluate:
        state.runtimePolyfillState.isEnabled &&
        state.runtimePolyfillState.isLoaded,
      presets: presetsArray,
      prettify: state.plugins.prettier.isEnabled
    });
  };

  _presetsUpdatedSetStateCallback = () => {
    this._checkForUnloadedPlugins();
    this._updateCode(this.state.code);
  };

  _presetsToArray(state: State = this.state): BabelPresets {
    const { presets } = state;

    return Object.keys(presets)
      .filter(key => presets[key].isEnabled && presets[key].isLoaded)
      .map(key => presets[key].config.label);
  }

  _toggleEnvPresetSetting = (name: string, value: any) => {
    this.setState(
      state => ({
        envConfig: {
          ...state.envConfig,
          [name]: value
        }
      }),
      this._presetsUpdatedSetStateCallback
    );
  };

  _toggleIsSidebarExpanded = (isExpanded: boolean) => {
    this.setState(
      {
        isSidebarExpanded: isExpanded
      },
      this._persistState
    );
  };

  _toggleSetting = (name: string, isEnabled: boolean) => {
    this.setState(state => {
      const { plugins, presets, runtimePolyfillState } = state;

      if (name === 'babel-polyfill') {
        runtimePolyfillState.isEnabled = isEnabled;

        return {
          runtimePolyfillState
        };
      } else if (state.hasOwnProperty(name)) {
        return {
          [name]: isEnabled
        };
      } else if (plugins.hasOwnProperty(name)) {
        plugins[name].isEnabled = isEnabled;

        return {
          plugins
        };
      } else if (presets.hasOwnProperty(name)) {
        presets[name].isEnabled = isEnabled;

        return {
          presets
        };
      }
    }, this._presetsUpdatedSetStateCallback);
  };

  _updateCode = (code: string) => {
    this.setState(state => this._compile(code, state), this._persistState);
  };

  _persistState = () => {
    const { envConfig, plugins } = this.state;

    const presetsArray = this._presetsToArray();

    const babili = this.state.plugins['babili-standalone'];
    if (babili.isEnabled) {
      presetsArray.push('babili');
    }

    if (envConfig.isEnvPresetEnabled) {
      presetsArray.push('env');
    }

    const state = {
      babili: plugins['babili-standalone'].isEnabled,
      browsers: envConfig.browsers,
      builtIns: this.state.builtIns,
      code: this.state.code,
      debug: false, // TODO Support this flag
      evaluate: this.state.runtimePolyfillState.isEnabled,
      experimental: false, // TODO Support this flag
      lineWrap: this.state.lineWrap,
      loose: false, // TODO Support this flag
      presets: presetsArray.join(','),
      prettier: plugins.prettier.isEnabled,
      spec: false, // TODO Support this flag
      showSidebar: this.state.isSidebarExpanded,
      targets: envConfigToTargetsString(envConfig)
    };

    StorageService.set('replState', state);
    UriUtils.updateQuery(state);
  };
}

const styles = {
  codeMirrorPanel: css({
    flex: '0 0 50%'
  }),
  optionsColumn: css({
    flex: '0 0 auto'
  }),
  repl: css({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'stretch',
    overflow: 'auto',

    [media.mediumAndDown]: {
      flexDirection: 'column'
    }
  }),
  panels: css({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'stretch',
    overflow: 'auto'
  })
};
