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
import { loadBuildArtifacts, loadLatestBuildNumberForBranch } from './CircleCI';
import CodeMirrorPanel from "./CodeMirrorPanel";
import ReplContext from "./ReplContext";
import ReplLoader from "./ReplLoader";
import ReplOptions from "./ReplOptions";
import StorageService from "./StorageService";
import UriUtils from "./UriUtils";
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
  config: {
    dependencies: ?{ [name: string]: string },
    error: boolean,
    files: ?{ [name: string]: { code: string } },
    ready: boolean,
    status: string,
  },
  configError: ?string,
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

class Repl extends React.Component<Props, State> {
  _numLoadingPlugins = 0;

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

    // TODO(bng): temporary
    persistedPresets.forEach(p => {
      if (!p) return;

      if (p === "env") {
        if (!isEnvTabExpanded) {
          isEnvTabExpanded = true;
        }
      } else {
        if (!isPresetsTabExpanded) {
          isPresetsTabExpanded = true;
        }

        presets.push(p);
      }
    });

    const envConfig = persistedStateToEnvConfig(persistedState);

    // TODO: cleanup/move to unstated
    this.state = {
      babel: persistedStateToBabelState(persistedState, babelConfig),
      code: persistedState.code,
      compileErrorMessage: null,
      compiled: null,
      configReady: false,
      config: {
        dependencies: null,
        error: null,
        files: null,
        ready: false,
        status: "Initializing...",
      },
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
  }

  componentDidMount() {
    this.setupConfig();
  }

  renderOptions({ availablePresets, babelVersion }) {
    const state = this.state;

    // TODO(bng): this is super temporary... we need to generally clean up
    // all the preset/plugin state stuff, as the order of operations has
    // changed from being:
    //
    // props -> load babel -> get context -> convert to state -> compile
    //
    // to:
    //
    // props -> sandpack compiles -> get babel context -> deal with result
    const presets = configArrayToStateMap(
      availablePresets,
      state.presets.reduce((result, p) => {
        result[p] = true;
        return result;
      }, {}),
    );

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

    if (!state.config.ready) {
      return <ReplLoader isLoading={!state.config.error} message={state.config.status} />;
    }
    console.log(state.config)
    return (
      <SandpackProvider
        files={state.config.files}
        className={styles.repl}
        dependencies={state.config.dependencies}
        template="babel-repl"
        entry="/index.js"
        skipEval
      >
        <SandpackConsumer>
          {sandpackProps => (
            <ReplContext
              {...sandpackProps}
              renderEditor={this.renderEditor}
            />
          )}
        </SandpackConsumer>
      </SandpackProvider>
    );
  }

  // TODO(bng): replace this with package.json deps passed to sandpack
  // async _checkForUnloadedPlugins() {
  //   const {
  //     envConfig,
  //     envPresetState,
  //     shippedProposalsState,
  //     plugins,
  //     runtimePolyfillState,
  //   } = this.state;

  //   // Assume all default presets are baked into babel-standalone.
  //   // We really only need to worry about plugins.
  //   for (const key in plugins) {
  //     const plugin = plugins[key];

  //     if (plugin.isEnabled && !plugin.isLoaded && !plugin.isLoading) {
  //       this._numLoadingPlugins++;
  //       this._workerApi.loadPlugin(plugin).then(success => {
  //         this._numLoadingPlugins--;

  //         // If a plugin has failed to load, re-render to show a loading error.
  //         if (!success) {
  //           this.setState({ plugins });
  //         }

  //         // Once all plugins have been loaded, re-compile code.
  //         if (this._numLoadingPlugins === 0) {
  //           this._updateCode(this.state.code);
  //         }
  //       });
  //     }
  //   }

  //   // Babel (runtime) polyfill is large;
  //   // It's only needed if we're actually executing the compiled code.
  //   // Defer loading it unless "evaluate" is enabled.
  //   if (runtimePolyfillState.isEnabled && !runtimePolyfillState.isLoaded) {
  //     // Compilation is done in a web worker for performance reasons,
  //     // But eval requires the UI thread so code can access globals like window.
  //     // Because of this, the runtime polyfill must be loaded on the UI thread.
  //     // We also eval in an iframe so the polyfills need to be accessible there.
  //     // We could copy them from window to frame.contentWindow,
  //     // But it's less error-prone to just load the polyfills into the iframe.
  //     loadPlugin(
  //       runtimePolyfillState,
  //       () => {
  //         let evalErrorMessage: ?string = null;

  //         if (!this.state.compiled) {
  //           return;
  //         }

  //         // No need to recompile at this point;
  //         // Just evaluate the most recently compiled code.
  //         try {
  //           // eslint-disable-next-line
  //           scopedEval.execute(this.state.compiled, this.state.sourceMap);
  //         } catch (error) {
  //           evalErrorMessage = error.message;
  //         }

  //         // Re-render (even if no error) to update the label loading-state.
  //         this.setState({ evalErrorMessage });
  //       },
  //       scopedEval.getIframe()
  //     );
  //   }

  //   // Babel 'env' preset is large;
  //   // Only load it if it's been requested.
  //   if (envConfig.isEnvPresetEnabled && !envPresetState.isLoaded) {
  //     envPresetState.isLoading = true;
  //     loadBundle(envPresetState, this._workerApi).then(() => {
  //       // This preset is not built into Babel standalone due to its size.
  //       // Before we can use it we need to explicitly register it.
  //       // Because it's loaded in a worker, we need to configure it there as well.
  //       this._workerApi
  //         .registerEnvPreset()
  //         .then(() => this._updateCode(this.state.code));
  //     });
  //   }
  //   if (
  //     envConfig.isEnvPresetEnabled &&
  //     envConfig.shippedProposals &&
  //     !shippedProposalsState.isLoaded
  //   ) {
  //     const availablePlugins = await this._workerApi.getAvailablePlugins();
  //     const availablePluginsNames = availablePlugins.map(({ label }) => label);
  //     const notRegisteredPackages = shippedProposalsState.config.packages
  //       .filter(
  //         packageState => !availablePluginsNames.includes(packageState.label)
  //       )
  //       .map(config =>
  //         configToState({ ...config, version: this.state.babel.version }, true)
  //       );

  //     if (notRegisteredPackages.length) {
  //       shippedProposalsState.isLoading = true;
  //       const plugins = await Promise.all(
  //         notRegisteredPackages.map(state => loadBundle(state, this._workerApi))
  //       );
  //       const allPluginsAreLoaded = plugins.every(({ isLoaded }) => isLoaded);
  //       if (allPluginsAreLoaded) {
  //         await this._workerApi.registerPlugins(
  //           plugins.map(({ config }) => ({
  //             instanceName: config.instanceName,
  //             pluginName: config.label,
  //           }))
  //         );
  //         shippedProposalsState.isLoaded = true;
  //         this._updateCode(this.state.code);
  //       } else {
  //         shippedProposalsState.didError = true;
  //       }
  //       shippedProposalsState.isLoading = false;
  //     }
  //   }
  // }

  _pluginSearch = value =>
    this.setState({
      pluginSearch: value,
    });

  _pluginChange = plugin => {
    const pluginExists = this.state.externalPlugins.includes(plugin.name);

    this.setState({ loadingExternalPlugins: true });

    const bundledUrl = `https://bundle.run/${plugin.name}@${plugin.version}`;

    // TODO(bng): replace
    // this._workerApi.loadExternalPlugin(bundledUrl).then(loaded => {
    //   if (loaded === false) {
    //     this.setState({
    //       compileErrorMessage: `Plugin ${plugin.name} could not be loaded`,
    //       loadingExternalPlugins: false,
    //     });
    //     return;
    //   }

    //   this._workerApi
    //     .registerPlugins([
    //       {
    //         instanceName: toCamelCase(plugin.name),
    //         pluginName: plugin.name,
    //       },
    //     ])
    //     .then(() => {
    //       this.setState({ loadingExternalPlugins: false });
    //     });

    //   if (!pluginExists) {
    //     this.setState(
    //       state => ({
    //         externalPlugins: [...state.externalPlugins, plugin.name],
    //       }),
    //       this._pluginsUpdatedSetStateCallback
    //     );
    //   } else {
    //     this.setState(
    //       state => ({
    //         externalPlugins: state.externalPlugins.filter(
    //           p => p !== plugin.name
    //         ),
    //       }),
    //       this._pluginsUpdatedSetStateCallback
    //     );
    //   }
    // });
  };

  _showOfficialExternalPluginsChanged = () =>
    this.setState(state => ({
      showOfficialExternalPlugins: !state.showOfficialExternalPlugins,
    }));

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

  _onSettingChange = (name: string, value: any) => {
    this.setState(state => {
      const { plugins, presets, runtimePolyfillState } = state;

      if (name === "babel-polyfill") {
        runtimePolyfillState.isEnabled = value;

        return {
          runtimePolyfillState,
        };
      } else if (name === "presets") {
        return { presets: value };
      } else if (state.hasOwnProperty(name)) {
        return {
          [name]: value,
        };
      } else if (plugins.hasOwnProperty(name)) {
        plugins[name].isEnabled = value;

        return {
          plugins,
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

    const presetsArray = this.state.presets.slice();

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
    this._updateCode(this.state.code);
  };

  async setupConfig() {
    const {
      babel,
      code,
      envConfig,
      envPresetState,
      presets: requestedPresets,
      runtimePolyfillState,
    } = this.state;

    const packageDeps = {};
    const requestedBabelVersion = babel.version || "6.26.0";
    const scopeNeeded = semver.gte(requestedBabelVersion, "7.0.0-beta.5");

    const getConfigNameFromKey = (key, scopeNeeded) => scopeNeeded ? `@babel/preset-${key}` : key;
    const getPackageNameFromKey = (key, scopeNeeded) => scopeNeeded ? `@babel/preset-${key}` : `babel-preset-${key}`;

    // TODO: handle 3rd party presets?
    const presets = requestedPresets.map(key => getConfigNameFromKey(key, scopeNeeded));

    if (envConfig.isEnvPresetEnabled) {
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
      } else if (semver.satisfies(requestedBabelVersion, "^6")) {
        packageVersion = "1.6.1";
      }

      packageDeps[getPackageNameFromKey("env", scopeNeeded)] = packageVersion;
    }

    const babelrc = {
      // TODO: handle state.externalPlugins
      plugins: [],
      presets: presets,
      sourceMaps: runtimePolyfillState.isEnabled,
    };

    const files = {
      "/index.js": {
        code: code,
      },
      "/.babelrc": {
        code: JSON.stringify(babelrc, null, 2),
      },
    };

    let build = babel.build;
    const buildFromPath = window.location.pathname.match(/\/build\/([^/]+)\/?$/);

    if (buildFromPath) {
      build = buildFromPath[1];
    }

    if (build) {
      let url;

      const isBuildNumeric = /^[0-9]+$/.test(build);

      try {
        if (!isBuildNumeric) {
          // Build in URL is *not* numeric, assume it's a branch name
          // Get the latest build number for this branch.
          //
          // NOTE:
          // Since we switched the 7.0 branch to master, we map /build/7.0 to
          // /build/master for backwards compatibility.
          build = await loadLatestBuildNumberForBranch(
            babel.circleciRepo,
            build === "7.0" ? "master" : build
          );
        }

        const packageName = babel.config.package;
        const packageFile = `${packageName.replace(/-standalone/, "")}.js`;
        const regExp = new RegExp(`${packageName}/${packageFile}$`);

        url = await loadBuildArtifacts(
          babel.circleciRepo,
          regExp,
          build,
        );
      } catch (ex) {
        this.setState({
          config: {
            error: true,
            status: ex.message,
          },
        });

        return;
      }

      files["/babel-transpiler.json"] = {
        code: JSON.stringify({
          babelURL: url,
        }, null, 2),
      };
    }

    this.setState({
      config: {
        dependencies: packageDeps,
        files,
        ready: true,
      },
    });
  }

  // TODO(bng): maybe expose a debounce/delay timeout on SandpackProducer?
  _updateCode = (code: string) => {
    this.setState({ code }, this._persistState);
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
