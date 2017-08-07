// @flow

import { css } from 'glamor';
import React from 'react';
import CodeMirrorPanel from './CodeMirrorPanel';
import ReplOptions from './ReplOptions';
import StorageService from './StorageService';
import UriUtils from './UriUtils';
import compile from './compile';
import loadPlugin from './loadPlugin';
import { pluginConfigs, presetPluginConfigs } from './PluginConfig';
import { media } from './styles';

import type { PersistedState, PluginConfigs, PluginStateMap } from './types';

type Props = {};
type State = {
  code: string,
  compiled: ?string,
  compileError: ?Error,
  evalError: ?Error,
  evaluate: boolean,
  lineWrap: boolean,
  plugins: PluginStateMap,
  presets: PluginStateMap
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
      evaluate: persistedState.evaluate,
      lineWrap: persistedState.lineWrap,
      plugins: configToState(pluginConfigs, false, defaultPlugins),
      presets: configToState(presetPluginConfigs, true, defaultPresets)
    };

    this.state = {
      ...state,
      ...this._compile(persistedState.code, state)
    };

    // Load any plug-ins enabled by query params
    this._checkForUnloadedPlugins();
  }

  render() {
    const {
      code,
      compiled,
      compileError,
      evaluate,
      evalError,
      lineWrap,
      plugins,
      presets
    } = this.state;

    const options = {
      lineWrapping: lineWrap
    };

    return (
      <div className={styles.repl}>
        <ReplOptions
          className={styles.optionsColumn}
          evaluate={evaluate}
          lineWrap={lineWrap}
          pluginState={plugins}
          presetState={presets}
          toggleSetting={this._toggleSetting}
        />

        <div className={styles.panels}>
          <CodeMirrorPanel
            className={styles.codeMirrorPanel}
            code={code}
            error={compileError}
            onChange={this._updateCode}
            options={options}
          />
          <CodeMirrorPanel
            className={styles.codeMirrorPanel}
            code={compiled}
            error={evalError}
            options={options}
          />
        </div>
      </div>
    );
  }

  _checkForUnloadedPlugins() {
    const { plugins } = this.state;

    // Assume all default presets are baked into babel-standalone
    // We really only need to worry about plugins
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
  }

  _compile = (code: string, state: State) => {
    const { evaluate, plugins } = state;

    return compile(code, {
      evaluate: evaluate,
      presets: this._presetsToArray(state),
      prettify: plugins.prettier.isEnabled
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
        const { plugins, presets } = state;

        if (state.hasOwnProperty(name)) {
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
        const { code } = this.state;

        this._checkForUnloadedPlugins();
        this._updateCode(code);
      }
    );
  };

  _updateCode = (code: string) => {
    this.setState(state => this._compile(code, state), this._persistState);
  };

  _persistState = () => {
    const { code, evaluate, lineWrap, plugins } = this.state;

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
      code,
      debug: false, // TODO
      evaluate,
      lineWrap,
      presets: presetsArray.join(','),
      prettier: plugins.prettier.isEnabled,
      targets: '' // TODO
    };

    StorageService.set('replState', state);
    UriUtils.updateQuery(state);
  };
}

type DefaultPlugins = { [name: string]: boolean };

const configToState = (
  pluginConfigs: PluginConfigs,
  arePreLoaded: boolean,
  defaults: DefaultPlugins = {}
): PluginStateMap =>
  pluginConfigs.reduce((reduced, config) => {
    reduced[config.package] = {
      config,
      didError: false,
      isEnabled: defaults[config.package] === true,
      isLoaded: arePreLoaded,
      isLoading: false,
      plugin: null
    };

    return reduced;
  }, {});

const styles = {
  codeMirrorPanel: css({
    flex: '0 0 50%'
  }),
  optionsColumn: css({
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem 0',
    overflow: 'auto',

    [media.small]: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      padding: 0
    }
  }),
  repl: css({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'stretch',
    overflow: 'auto',

    [media.small]: {
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
