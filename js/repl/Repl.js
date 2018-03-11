// @flow

import "regenerator-runtime/runtime";

import { css } from "emotion";
import debounce from "lodash.debounce";
import React from "react";
import {
  SandpackConsumer,
  SandpackProvider,
} from "react-smooshpack/es/components";
import semver from "semver";
import { getCodeSize, getEnvPresetOptions } from "./Utils";
import ErrorBoundary from "./ErrorBoundary";
import CodeMirrorPanel from "./CodeMirrorPanel";
import ReplContext from './ReplContext';
import ReplOptions from "./ReplOptions";
import StorageService from "./StorageService";
import UriUtils from "./UriUtils";
import loadBundle from "./loadBundle";
import loadPlugin from "./loadPlugin";
import PresetLoadingAnimation from "./PresetLoadingAnimation";
import {
  babelConfig,
  envPresetConfig,
  shippedProposalsConfig,
  pluginConfigs,
  runtimePolyfillConfig,
} from "./PluginConfig";
import {
  envConfigToTargetsString,
  replState,
  configArrayToStateMap,
  configToState,
  persistedStateToBabelState,
  persistedStateToEnvState,
  persistedStateToEnvConfig,
  persistedStateToShippedProposalsState,
} from "./replUtils";
import WorkerApi from "./WorkerApi";
import scopedEval from "./scopedEval";
import { colors, media } from "./styles";

import type {
  BabelPresets,
  BabelState,
  EnvState,
  ShippedProposalsState,
  EnvConfig,
  PluginState,
  PluginStateMap,
  SandpackConsumerProps,
  SandpackStatus,
} from "./types";

type Props = {};
type State = {
  babel: BabelState,
  code: string,
  compiled: ?string,
  compileErrorMessage: ?string,
  debugEnvPreset: boolean,
  envConfig: EnvConfig,
  envPresetDebugInfo: ?string,
  envPresetState: EnvState,
  shippedProposalsState: ShippedProposalsState,
  evalErrorMessage: ?string,
  fileSize: boolean,
  isEnvPresetTabExpanded: boolean,
  isPluginsExpanded: boolean,
  isPresetsTabExpanded: boolean,
  isSettingsTabExpanded: boolean,
  isSidebarExpanded: boolean,
  lineWrap: boolean,
  meta: Object,
  plugins: PluginStateMap,
  presets: PluginStateMap,
  runtimePolyfillState: PluginState,
  sourceMap: ?string,
  externalPlugins: Array<string>,
  pluginSearch: ?string,
  version: number,
  showOfficialExternalPlugins: boolean,
  loadingExternalPlugins: boolean,
};

const DEBOUNCE_DELAY = 500;

function toCamelCase(str) {
  return str
    .replace(/-/g, " ")
    .replace(/\//g, "_")
    .replace(/@/g, "_")
    .replace(/\s(.)/g, function($1) {
      return $1.toUpperCase();
    })
    .replace(/\s/g, "")
    .replace(/^(.)/, function($1) {
      return $1.toLowerCase();
    });
}

class Repl extends React.Component {
  props: Props;
  state: State;

  _numLoadingPlugins = 0;
  _workerApi = new WorkerApi();

  constructor(props: Props, context: any) {
    super(props, context);

    const persistedState = replState();
    const defaultPlugins = {
      "babili-standalone": persistedState.babili,
      prettier: persistedState.prettier,
    };

    const persistedPresets = persistedState.presets
      ? persistedState.presets.split(",")
      : [];

    const presets = [];
    let isEnvTabExpanded = false;
    let isPresetsTabExpanded = false;

    persistedPresets.forEach(p => {
      if (p) presets.push(p);
      if (!isEnvTabExpanded && p === "env") isEnvTabExpanded = true;
      if (!isPresetsTabExpanded && p) isPresetsTabExpanded = true;
    });

    const envConfig = persistedStateToEnvConfig(persistedState);

    // A partial State is defined first b'c this._compile needs it.
    // The compile helper will then populate the missing State values.
    this.state = {
      babel: persistedStateToBabelState(persistedState, babelConfig),
      code: persistedState.code,
      compileErrorMessage: null,
      compiled: null,
      debugEnvPreset: persistedState.debug,
      envConfig,
      envPresetDebugInfo: null,
      envPresetState: persistedStateToEnvState(
        persistedState,
        envPresetConfig,
        envConfig.isEnvPresetEnabled
      ),
      evalErrorMessage: null,
      externalPlugins: [],
      fileSize: persistedState.fileSize,
      isEnvPresetTabExpanded: isEnvTabExpanded,
      isPresetsTabExpanded,
      isPluginsExpanded: false,
      isSettingsTabExpanded: persistedState.isSettingsTabExpanded,
      isSidebarExpanded: persistedState.showSidebar,
      lineWrap: persistedState.lineWrap,
      meta: {
        compiledSize: 0,
        rawSize: 0,
      },
      pluginSearch: "",
      plugins: configArrayToStateMap(pluginConfigs, defaultPlugins),
      presets,
      runtimePolyfillState: configToState(
        runtimePolyfillConfig,
        persistedState.evaluate
      ),
      shippedProposalsState: persistedStateToShippedProposalsState(
        persistedState,
        shippedProposalsConfig,
        envConfig.isEnvPresetEnabled && envConfig.shippedProposals
      ),
      showOfficialExternalPlugins: false,
      sourceMap: null,
    };

    this._setupBabel();
  }

  renderOptions({ availablePresets, babelVersion }) {
    const state = this.state;

    const presets = configArrayToStateMap(availablePresets, state.presets);
    console.log(5, availablePresets, presets);
    return (
      <ReplOptions
        babelVersion={babelVersion}
        className={styles.optionsColumn}
        debugEnvPreset={state.debugEnvPreset}
        envConfig={state.envConfig}
        envPresetState={state.envPresetState}
        shippedProposalsState={state.shippedProposalsState}
        fileSize={state.fileSize}
        isEnvPresetTabExpanded={state.isEnvPresetTabExpanded}
        isExpanded={state.isSidebarExpanded}
        isPluginsExpanded={state.isPluginsExpanded}
        isPresetsTabExpanded={state.isPresetsTabExpanded}
        isSettingsTabExpanded={state.isSettingsTabExpanded}
        lineWrap={state.lineWrap}
        onEnvPresetSettingChange={this._onEnvPresetSettingChange}
        onIsExpandedChange={this._onIsSidebarExpandedChange}
        onSettingChange={this._onSettingChange}
        onTabExpandedChange={this._onTabExpandedChange}
        pluginState={state.plugins}
        presetState={presets}
        runtimePolyfillConfig={runtimePolyfillConfig}
        runtimePolyfillState={state.runtimePolyfillState}
        externalPlugins={state.externalPlugins}
        pluginChange={this._pluginChange}
        pluginSearch={this._pluginSearch}
        pluginValue={state.pluginSearch}
        showOfficialExternalPluginsChanged={
          this._showOfficialExternalPluginsChanged
        }
        showOfficialExternalPlugins={state.showOfficialExternalPlugins}
        loadingExternalPlugins={state.loadingExternalPlugins}
      />
    );
  }

  // TODO: Activate this once SandpackConsumer exposes bundler status
  renderLoader = (status: SandpackStatus, errors?: Array<string>) => {
    let message;
    let loading = true;

    if (errors.length) {
      loading = false;
      message = "An error occurred while loading Babel :(";
    } else {
      switch (status) {
        case 'initializing':
          message = 'Initializing...';
          break;

        case 'installing-dependencies':
          message = 'Installing dependencies...';
          break;
      }
    }

    return (
      <div className={styles.loader}>
        <div className={styles.loaderContent}>
          {message}
          {loading && (
            <PresetLoadingAnimation className={styles.loadingAnimation} />
          )}
        </div>
      </div>
    );
  };

  renderEditor = ({
    compiledCode,
    errors,
    getManagerTranspilerContext,
    managerState,
    managerStatus,
    transpilerContext,
  }) => {
    const state = this.state;
    const options = {
      fileSize: state.fileSize,
      lineWrapping: state.lineWrap,
    };

    return (
      <React.Fragment>
        {this.renderOptions(transpilerContext)}

        <div className={styles.panels}>
          <CodeMirrorPanel
            className={styles.codeMirrorPanel}
            code={this.state.code}
            errorMessage={errors.length ? errors[0].message : undefined}
            fileSize={getCodeSize(this.state.code)}
            key="input"
            onChange={this._updateCode}
            options={options}
            placeholder="Write code here"
          />
          <CodeMirrorPanel
            className={styles.codeMirrorPanel}
            code={compiledCode}
            errorMessage={state.evalErrorMessage}
            fileSize={compiledCode ? getCodeSize(compiledCode) : null}
            info={
              state.debugEnvPreset ? state.envPresetDebugInfo : null
            }
            key="output"
            options={options}
            placeholder="Compiled output will be shown here"
          />
        </div>
      </React.Fragment>
    );
  };

  render() {
    const state = this.state;

    const options = {
      fileSize: state.fileSize,
      lineWrapping: state.lineWrap,
    };

    const { babelrc, packageDeps } = this.mapStateToConfigs(state);
    console.log(1, babelrc, packageDeps);
    return (
      <SandpackProvider
        files={{
          "/index.js": {
            code: state.code,
          },
          "/.babelrc": {
            code: JSON.stringify(babelrc, null, 2),
          },
        }}
        className={styles.repl}
        dependencies={packageDeps}
        template="preact-cli"
        entry="/index.js"
        skipEval
      >
        <SandpackConsumer>
          {sandpackProps => (
            <ReplContext
              {...sandpackProps}
              renderLoader={this.renderLoader}
              renderEditor={this.renderEditor}
            />
          )}
        </SandpackConsumer>
      </SandpackProvider>
    );
  }

  async _setupBabel(defaultPresets) {
    const babelState = await loadBundle(this.state.babel, this._workerApi);
    const { envPresetState } = this.state;

    this.setState({ babel: babelState });
    if (babelState.isLoaded) {
      if (!envPresetState.isLoading) {
        return this._compile(this.state.code, this._checkForUnloadedPlugins);
      }
      this._checkForUnloadedPlugins();
    }
  }

  async _checkForUnloadedPlugins() {
    const {
      envConfig,
      envPresetState,
      shippedProposalsState,
      plugins,
      runtimePolyfillState,
    } = this.state;

    // Assume all default presets are baked into babel-standalone.
    // We really only need to worry about plugins.
    for (const key in plugins) {
      const plugin = plugins[key];

      if (plugin.isEnabled && !plugin.isLoaded && !plugin.isLoading) {
        this._numLoadingPlugins++;
        this._workerApi.loadPlugin(plugin).then(success => {
          this._numLoadingPlugins--;

          // If a plugin has failed to load, re-render to show a loading error.
          if (!success) {
            this.setState({ plugins });
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
      // Compilation is done in a web worker for performance reasons,
      // But eval requires the UI thread so code can access globals like window.
      // Because of this, the runtime polyfill must be loaded on the UI thread.
      // We also eval in an iframe so the polyfills need to be accessible there.
      // We could copy them from window to frame.contentWindow,
      // But it's less error-prone to just load the polyfills into the iframe.
      loadPlugin(
        runtimePolyfillState,
        () => {
          let evalErrorMessage: ?string = null;

          if (!this.state.compiled) {
            return;
          }

          // No need to recompile at this point;
          // Just evaluate the most recently compiled code.
          try {
            // eslint-disable-next-line
            scopedEval.execute(this.state.compiled, this.state.sourceMap);
          } catch (error) {
            evalErrorMessage = error.message;
          }

          // Re-render (even if no error) to update the label loading-state.
          this.setState({ evalErrorMessage });
        },
        scopedEval.getIframe()
      );
    }

    // Babel 'env' preset is large;
    // Only load it if it's been requested.
    if (envConfig.isEnvPresetEnabled && !envPresetState.isLoaded) {
      envPresetState.isLoading = true;
      loadBundle(envPresetState, this._workerApi).then(() => {
        // This preset is not built into Babel standalone due to its size.
        // Before we can use it we need to explicitly register it.
        // Because it's loaded in a worker, we need to configure it there as well.
        this._workerApi
          .registerEnvPreset()
          .then(() => this._updateCode(this.state.code));
      });
    }
    if (
      envConfig.isEnvPresetEnabled &&
      envConfig.shippedProposals &&
      !shippedProposalsState.isLoaded
    ) {
      const availablePlugins = await this._workerApi.getAvailablePlugins();
      const availablePluginsNames = availablePlugins.map(({ label }) => label);
      const notRegisteredPackages = shippedProposalsState.config.packages
        .filter(
          packageState => !availablePluginsNames.includes(packageState.label)
        )
        .map(config =>
          configToState({ ...config, version: this.state.babel.version }, true)
        );

      if (notRegisteredPackages.length) {
        shippedProposalsState.isLoading = true;
        const plugins = await Promise.all(
          notRegisteredPackages.map(state => loadBundle(state, this._workerApi))
        );
        const allPluginsAreLoaded = plugins.every(({ isLoaded }) => isLoaded);
        if (allPluginsAreLoaded) {
          await this._workerApi.registerPlugins(
            plugins.map(({ config }) => ({
              instanceName: config.instanceName,
              pluginName: config.label,
            }))
          );
          shippedProposalsState.isLoaded = true;
          this._updateCode(this.state.code);
        } else {
          shippedProposalsState.didError = true;
        }
        shippedProposalsState.isLoading = false;
      }
    }
  }
  _pluginSearch = value =>
    this.setState({
      pluginSearch: value,
    });

  _pluginChange = plugin => {
    const pluginExists = this.state.externalPlugins.includes(plugin.name);

    this.setState({ loadingExternalPlugins: true });

    const bundledUrl = `https://bundle.run/${plugin.name}@${plugin.version}`;

    this._workerApi.loadExternalPlugin(bundledUrl).then(loaded => {
      if (loaded === false) {
        this.setState({
          compileErrorMessage: `Plugin ${plugin.name} could not be loaded`,
          loadingExternalPlugins: false,
        });
        return;
      }

      this._workerApi
        .registerPlugins([
          {
            instanceName: toCamelCase(plugin.name),
            pluginName: plugin.name,
          },
        ])
        .then(() => {
          this.setState({ loadingExternalPlugins: false });
        });

      if (!pluginExists) {
        this.setState(
          state => ({
            externalPlugins: [...state.externalPlugins, plugin.name],
          }),
          this._pluginsUpdatedSetStateCallback
        );
      } else {
        this.setState(
          state => ({
            externalPlugins: state.externalPlugins.filter(
              p => p !== plugin.name
            ),
          }),
          this._pluginsUpdatedSetStateCallback
        );
      }
    });
  };

  _showOfficialExternalPluginsChanged = () =>
    this.setState(state => ({
      showOfficialExternalPlugins: !state.showOfficialExternalPlugins,
    }));

  _compile = (code: string, setStateCallback: () => mixed) => {
    const { state } = this;
    const { runtimePolyfillState } = state;

    const presetsArray = this._presetsToArray(state);

    const babili = state.plugins["babili-standalone"];
    if (babili.isEnabled && babili.isLoaded) {
      presetsArray.push("babili");
    }
    this._workerApi
      .compile(code, {
        plugins: state.externalPlugins,
        debugEnvPreset: state.debugEnvPreset,
        envConfig: state.envPresetState.isLoaded ? state.envConfig : null,
        evaluate:
          runtimePolyfillState.isEnabled && runtimePolyfillState.isLoaded,
        presets: presetsArray,
        prettify: state.plugins.prettier.isEnabled,
        sourceMap: runtimePolyfillState.isEnabled,
      })
      .then(result => {
        this.setState(result, setStateCallback);
      });
  };

  // Debounce compilation since it's expensive.
  // This also avoids prematurely warning the user about invalid syntax,
  // eg when in the middle of typing a variable name.
  _compileToState = debounce(
    (code: string) => this._compile(code, this._persistState),
    DEBOUNCE_DELAY
  );

  _onEnvPresetSettingChange = (name: string, value: any) => {
    this.setState(
      state => ({
        envConfig: {
          ...state.envConfig,
          [name]: value,
        },
      }),
      this._pluginsUpdatedSetStateCallback
    );
  };

  _onIsSidebarExpandedChange = (isExpanded: boolean) => {
    this.setState(
      {
        isSidebarExpanded: isExpanded,
      },
      this._persistState
    );
  };

  _onSettingChange = (name: string, isEnabled: boolean) => {
    this.setState(state => {
      const { plugins, presets, runtimePolyfillState } = state;

      if (name === "babel-polyfill") {
        runtimePolyfillState.isEnabled = isEnabled;

        return {
          runtimePolyfillState,
        };
      } else if (state.hasOwnProperty(name)) {
        return {
          [name]: isEnabled,
        };
      } else if (plugins.hasOwnProperty(name)) {
        plugins[name].isEnabled = isEnabled;

        return {
          plugins,
        };
      } else if (presets.hasOwnProperty(name)) {
        presets[name].isEnabled = isEnabled;

        return {
          presets,
        };
      }
    }, this._pluginsUpdatedSetStateCallback);
  };

  _onTabExpandedChange = (name: string, isExpanded: boolean) => {
    this.setState(
      {
        [name]: isExpanded,
      },
      this._pluginsUpdatedSetStateCallback
    );
  };

  _persistState = () => {
    const { state } = this;
    const { envConfig, plugins } = state;

    const presetsArray = this._presetsToArray();

    const babili = state.plugins["babili-standalone"];
    if (babili.isEnabled) {
      presetsArray.push("babili");
    }

    if (envConfig.isEnvPresetEnabled) {
      presetsArray.push("env");
    }

    const builtIns = envConfig.isBuiltInsEnabled && envConfig.builtIns;

    const payload = {
      babili: plugins["babili-standalone"].isEnabled,
      browsers: envConfig.browsers,
      build: state.babel.build,
      builtIns: builtIns,
      circleciRepo: state.babel.circleciRepo,
      code: state.code,
      debug: state.debugEnvPreset,
      forceAllTransforms: envConfig.forceAllTransforms,
      shippedProposals: envConfig.shippedProposals,
      evaluate: state.runtimePolyfillState.isEnabled,
      fileSize: state.fileSize,
      isEnvPresetTabExpanded: state.isEnvPresetTabExpanded,
      isPluginsExpanded: state.isPluginsExpanded,
      isPresetsTabExpanded: state.isPresetsTabExpanded,
      isSettingsTabExpanded: state.isSettingsTabExpanded,
      lineWrap: state.lineWrap,
      presets: presetsArray.join(","),
      prettier: plugins.prettier.isEnabled,
      showSidebar: state.isSidebarExpanded,
      targets: envConfigToTargetsString(envConfig),
      version: state.babel.version,
      envVersion: state.envPresetState.version,
    };
    StorageService.set("replState", payload);
    UriUtils.updateQuery(payload);
  };

  _pluginsUpdatedSetStateCallback = () => {
    this._checkForUnloadedPlugins();
    this._updateCode(this.state.code);
  };

  // Returns a .babelrc and package.json dependencies
  mapStateToConfigs(
    {
      babel,
      envConfig,
      envPresetState,
      presets: requestedPresets,
      runtimePolyfillState,
    }: State = this.state
  ) {
    const packageDeps = {};
    const requestedBabelVersion = babel.version || "6.26.0";
    const scopeNeeded = semver.gte(requestedBabelVersion, "7.0.0-beta.5");

    const getConfigNameFromKey = (key, scopeNeeded) => scopeNeeded ? `@babel/preset-${key}` : key;
    const getPackageNameFromKey = (key, scopeNeeded) => scopeNeeded ? `@babel/preset-${key}` : `babel-preset-${key}`;

    // TODO: handle 3rd party presets?
    const presets = requestedPresets
      .filter(key => key !== "env")
      .map(key => getConfigNameFromKey(key, scopeNeeded));
    console.log(9, envPresetState)
    if (envPresetState.isEnabled) {
      presets.push([
        getConfigNameFromKey("env", scopeNeeded),
        getEnvPresetOptions(envConfig),
      ]);

      let packageVersion;
      const requestedEnvVersion = envPresetState.version;

      if (requestedEnvVersion) {
        packageVersion = requestedEnvVersion;
      } else if (scopeNeeded) {
        packageVersion = requestedBabelVersion;
      } else if (semver.satisfies(requestedVersion, "^6")) {
        packageVersion = "1.6.1";
      }

      packageDeps[getPackageNameFromKey("env", scopeNeeded)] = packageVersion;
    }

    const babelrc = {
      // TODO
      //plugins: state.externalPlugins,
      presets: presets,
      sourceMaps: runtimePolyfillState.isEnabled,
    };

    return {
      babelrc,
      packageDeps,
    }
  }

  _presetsToArray(state: State = this.state): BabelPresets {
    const { presets } = state;

    return Object.keys(presets)
      .filter(key => presets[key].isEnabled && presets[key].isLoaded)
      .map(key => presets[key].config.label);
  }

  _updateCode = (code: string) => {
    this.setState({ code });

    // Update state with compiled code, errors, etc after a small delay.
    // This prevents frequent updates while a user is typing.
    this._compileToState(code);
  };
}

export default function ReplWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <Repl />
    </ErrorBoundary>
  );
}

const styles = {
  loader: css({
    alignItems: "center",
    background: colors.inverseBackgroundDark,
    color: colors.inverseForegroundLight,
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    width: "100vw",
  }),
  loadingAnimation: css({
    justifyContent: "center",
    margin: "2rem 0 0 0",
  }),
  loaderContent: css({
    margin: "auto",
    textAlign: "center",
  }),
  codeMirrorPanel: css({
    flex: "0 0 50%",
  }),
  optionsColumn: css({
    flex: "0 0 auto",
  }),
  repl: css`
    height: 100%;
    height: calc(100vh - 50px); /* 50px is the header's height */
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    overflow: auto;
    font-size: 0.875rem;

    ${media.mediumAndDown} {
      flex-direction: column;
    }
  `,
  panels: css({
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "stretch",
    overflow: "auto",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  }),
};
