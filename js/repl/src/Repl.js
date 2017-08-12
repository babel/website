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
  pluginConfigs,
  presetPluginConfigs,
  runtimePolyfillConfig
} from './PluginConfig';
import { media } from './styles';

import type {
  PersistedState,
  PluginConfig,
  PluginConfigs,
  PluginState,
  PluginStateMap
} from './types';

type Props = {};
type State = {
  code: string,
  compiled: ?string,
  compileError: ?Error,
  evalError: ?Error,
  lineWrap: boolean,
  plugins: PluginStateMap,
  presets: PluginStateMap,
  runtimePolyfillState: PluginState
};

export default class Repl extends React.Component {
  static defaultProps = {
    defaultValue: ''
  };

  props: Props;
  state: State;

  _numLoadingPlugins = 0;

  constructor(props: Props, context: any) {
    super(props, context);

    const persistedState = this._loadState();

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

    // TODO Parse babel-preset-env settings
    const state = {
      code: persistedState.code,
      compiled: null,
      compileError: null,
      evalError: null,
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
          className={styles.optionsColumn}
          lineWrap={state.lineWrap}
          pluginState={state.plugins}
          presetState={state.presets}
          runtimePolyfillConfig={runtimePolyfillConfig}
          runtimePolyfillState={state.runtimePolyfillState}
          toggleSetting={this._toggleSetting}
        />

        <div className={styles.panels}>
          <CodeMirrorPanel
            className={styles.codeMirrorPanel}
            code={state.code}
            error={state.compileError}
            onChange={this._updateCode}
            options={options}
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
    const { plugins, runtimePolyfillState } = this.state;

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

          if (this._numLoadingPlugins === 0) {
            const { code } = this.state;

            this._updateCode(code);
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
  }

  _compile = (code: string, state: State) => {
    const presetsArray = this._presetsToArray(state);

    const babili = state.plugins['babili-standalone'];
    if (babili.isEnabled && babili.isLoaded) {
      presetsArray.push('babili');
    }

    return compile(code, {
      evaluate:
        state.runtimePolyfillState.isEnabled &&
        state.runtimePolyfillState.isLoaded,
      presets: presetsArray,
      prettify: state.plugins.prettier.isEnabled
    });
  };

  _loadState(): PersistedState {
    const storageState = StorageService.get('replState');
    const queryState = UriUtils.parseQuery();
    const merged = {
      ...storageState,
      ...queryState
    };

    return {
      babili: merged.babili === true,
      browsers: merged.browsers || '',
      builtIns: merged.builtIns === true,
      code: merged.code || '',
      debug: merged.debug === true,
      evaluate: merged.evaluate === true,
      lineWrap: merged.lineWrap != null ? merged.lineWrap : true,
      presets: merged.presets || '',
      prettier: merged.prettier === true,
      targets: merged.targets || ''
    };
  }

  _presetsToArray(state: State = this.state): Array<string> {
    const { presets } = state;

    return Object.keys(presets)
      .filter(key => presets[key].isEnabled && presets[key].isLoaded)
      .map(key => presets[key].config.label);
  }

  _toggleSetting = (name: string, isEnabled: boolean) => {
    this.setState(
      state => {
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
      },
      () => {
        this._checkForUnloadedPlugins();
        this._updateCode(this.state.code);
      }
    );
  };

  _updateCode = (code: string) => {
    this.setState(state => this._compile(code, state), this._persistState);
  };

  _persistState = () => {
    const plugins = this.state.plugins;

    const presetsArray = this._presetsToArray();

    const babili = plugins['babili-standalone'];
    if (babili.isEnabled && babili.isLoaded) {
      presetsArray.push('babili');
    }

    // TODO Add babel-preset-env settings
    const state = {
      babili: plugins['babili-standalone'].isEnabled,
      browsers: '', // TODO
      builtIns: false, // TODO
      code: this.state.code,
      debug: false, // TODO
      evaluate: this.state.runtimePolyfillState.isEnabled,
      lineWrap: this.state.lineWrap,
      presets: presetsArray.join(','),
      prettier: plugins.prettier.isEnabled,
      targets: '' // TODO
    };

    StorageService.set('replState', state);
    UriUtils.updateQuery(state);
  };
}

type DefaultPlugins = { [name: string]: boolean };

const configArrayToStateMap = (
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

const configToState = (
  config: PluginConfig,
  isEnabled: boolean = false
): PluginState => ({
  config,
  didError: false,
  isEnabled,
  isLoaded: config.isPreLoaded === true,
  isLoading: false,
  plugin: null
});

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
