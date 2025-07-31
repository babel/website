import "regenerator-runtime/runtime";
import "core-js";

import { cx, css } from "@emotion/css";
import debounce from "lodash.debounce";
import React, { type ChangeEvent } from "react";
import { prettySize, compareVersions } from "./lib/utils";
import ErrorBoundary from "./ErrorBoundary";
import { load as loadMonaco, Monaco } from "./Monaco";
import ReplOptions from "./ReplOptions";
import StorageService from "./lib/storageService";
import UriUtils from "./lib/uriUtils";
import loadBundle from "./lib/loadBundle";
import loadPlugin from "./lib/loadPlugin";
import TimeTravelSlider from "./TimeTravelSlider";
import {
  babelConfig,
  envPresetConfig,
  envPresetDefaults,
  shippedProposalsConfig,
  pluginConfigs,
  runtimePolyfillConfig,
} from "./lib/pluginConfig";
import {
  envConfigToTargetsString,
  replState,
  pluginConfigArrayToStateMap,
  pluginConfigToState,
  persistedStateToBabelState,
  persistedStateToEnvState,
  persistedStateToEnvConfig,
  persistedStateToPresetsOptions,
  persistedStateToShippedProposalsState,
  persistedStateToExternalPluginsState,
  stateToConfig,
  presetsToArray,
} from "./lib/replUtils";
import WorkerApi from "./lib/workerApi";
import scopedEval from "./lib/scopedEval";
import { media } from "./lib/styles";
import { toCamelCase, hasOwnProperty } from "./lib/utils";

import type {
  BabelState,
  BabelPlugin,
  EnvState,
  ShippedProposalsState,
  EnvConfig,
  PresetsOptions,
  PluginState,
  PluginStateMap,
  SourceType,
} from "./lib/types";
import ReplLoading from "./ReplLoading";
import Tabs from "./Tabs";

type Props = object;

type State = {
  babel: BabelState;
  config: string;
  code: string;
  compiled: string | undefined | null;
  compileErrorMessage: string | undefined | null;
  envConfig: EnvConfig;
  envPresetState: EnvState;
  shippedProposalsState: ShippedProposalsState;
  presetsOptions: PresetsOptions;
  evalErrorMessage: string | undefined | null;
  fileSize: boolean;
  timeTravel: boolean;
  sourceType: SourceType;
  isSidebarExpanded: boolean;
  lineWrap: boolean;
  meta: any;
  plugins: PluginStateMap;
  presets: PluginStateMap;
  runtimePolyfillState: PluginState;
  sourceMap: string | undefined | null;
  externalPlugins: Array<BabelPlugin>;
  pluginSearch: string | undefined | null;
  showOfficialExternalPlugins: boolean;
  loadingExternalPlugins: boolean;
  transitions: Array<any>;
  currentTransition: any;
  leftTab: string;
  rightTab: string;
};

const DEBOUNCE_DELAY = 500;

class Repl extends React.Component<Props, State> {
  _numLoadingPlugins = 0;
  _workerApi = new WorkerApi();
  _availablePlugins: Array<string> = [];

  constructor(props: Props) {
    super(props);

    const persistedState = replState();
    const defaultPlugins = {
      prettier: persistedState.prettier,
    };

    const presets = persistedState.presets
      ? persistedState.presets.split(",")
      : [];

    const defaultPresets = presets.reduce((reduced, key) => {
      if (key) reduced[key] = true;
      return reduced;
    }, {});

    const presetsOptions = persistedStateToPresetsOptions(persistedState);
    const envConfig = persistedStateToEnvConfig(persistedState);
    envConfig.assumptions =
      envConfig.assumptions === undefined ? {} : envConfig.assumptions;

    // A partial State is defined first b'c this._compile needs it.
    // The compile helper will then populate the missing State values.
    this.state = {
      babel: persistedStateToBabelState(persistedState, babelConfig),
      config: JSON.stringify(JSON.parse(persistedState.config), undefined, 2),
      code: persistedState.code,
      compiled: null,
      pluginSearch: "",
      compileErrorMessage: null,
      presetsOptions,
      envConfig,
      envPresetState: persistedStateToEnvState(
        persistedState,
        envPresetConfig,
        envConfig.isEnvPresetEnabled
      ),
      shippedProposalsState: persistedStateToShippedProposalsState(
        persistedState,
        shippedProposalsConfig,
        envConfig.isEnvPresetEnabled && envConfig.shippedProposals
      ),
      evalErrorMessage: null,
      fileSize: persistedState.fileSize,
      timeTravel: persistedState.timeTravel,
      sourceType: persistedState.sourceType,
      isSidebarExpanded: persistedState.showSidebar,
      lineWrap: persistedState.lineWrap,
      meta: {
        compiledSize: 0,
        rawSize: 0,
      },
      plugins: pluginConfigArrayToStateMap(pluginConfigs, defaultPlugins),
      // Filled in after Babel is loaded
      presets: {},
      runtimePolyfillState: pluginConfigToState(
        runtimePolyfillConfig,
        persistedState.evaluate
      ),
      sourceMap: null,
      showOfficialExternalPlugins: false,
      externalPlugins: persistedStateToExternalPluginsState(persistedState),
      loadingExternalPlugins: false,
      transitions: [],
      currentTransition: {},
      leftTab: "code",
      rightTab: "code",
    };
    this._setupBabel(defaultPresets);
  }

  _configToState = (config: string) => {
    const state = this.state;
    const newState: Pick<State, keyof State> = {} as any;
    let configObject: any;
    try {
      configObject = JSON.parse(config);
    } catch {
      return;
    }

    newState.sourceType = configObject.sourceType;
    newState.externalPlugins = (
      (configObject.plugins || []) as BabelPlugin[]
    ).map((plugin) => {
      let name: string;
      let version;
      let options;
      if (Array.isArray(plugin)) {
        name = plugin[0] + "";
        options = plugin[1];
      } else {
        name = plugin + "";
      }
      const arr = name.split("@");
      if (arr.length === 3) {
        name = arr[0] + "@" + arr[1];
        version = arr[2];
      } else if (arr.length === 2 && arr[0] !== "") {
        name = arr[0];
        version = arr[1];
      }
      return {
        name,
        version,
        options,
      };
    });
    newState.envConfig = {
      ...state.envConfig,
      assumptions: configObject.assumptions || {},
    };
    newState.presets = state.presets;
    if (configObject.presets?.length) {
      Object.keys(state.presets).forEach((key) => {
        for (const preset of configObject.presets) {
          const presetName = Array.isArray(preset) ? preset[0] : preset;
          if (presetName === key) {
            const presetOptions = Array.isArray(preset) ? preset[1] : undefined;
            newState.presets[key].isEnabled = true;
            newState.presets[key].options = presetOptions;
            if (key === "env") {
              newState.presets[key].options = undefined;

              const envConfig = newState.envConfig;
              envConfig.isEnvPresetEnabled = true;
              envConfig.modules = presetOptions.modules || false;
              envConfig.isBugfixesEnabled = presetOptions.bugfixes || false;
              envConfig.isSpecEnabled = presetOptions.spec || false;
              envConfig.isLooseEnabled = presetOptions.loose || false;
              envConfig.builtIns = presetOptions.useBuiltIns || false;
              envConfig.corejs = presetOptions.corejs || false;
              envConfig.forceAllTransforms =
                presetOptions.forceAllTransforms || false;
              envConfig.shippedProposals =
                presetOptions.shippedProposals || false;

              const targets = presetOptions.targets;
              if (targets == null) {
                envConfig.browsers = "";
                envConfig.isElectronEnabled = envConfig.isNodeEnabled = false;
              } else if (typeof targets === "string") {
                envConfig.browsers = targets;
                envConfig.isElectronEnabled = envConfig.isNodeEnabled = false;
              } else if (typeof targets === "object") {
                envConfig.browsers = targets.browsers || "";
                if (targets.electron != null) {
                  envConfig.isElectronEnabled = true;
                  envConfig.electron = targets.electron;
                }
                if (targets.node != null) {
                  envConfig.isNodeEnabled = true;
                  envConfig.node = targets.node;
                }
              }
            }
            return;
          }
        }
        if (key === "env") {
          newState.envConfig.isEnvPresetEnabled = false;
        }
        newState.presets[key].isEnabled = false;
        newState.presets[key].options = undefined;
      });
    }
    return newState;
  };

  _stateToConfig = (state = this.state) => {
    const configObject = stateToConfig(
      state.babel.version,
      state.sourceType,
      state.externalPlugins,
      state.presets,
      state.envConfig,
      state.presetsOptions
    );
    const oldConfigObject =
      state === this.state ? null : JSON.parse(state.config);
    if (oldConfigObject) {
      Object.keys(oldConfigObject).forEach((key) => {
        if (configObject[key] == null) {
          configObject[key] = oldConfigObject[key];
        }
      });
    }

    return { config: JSON.stringify(configObject, undefined, 2) };
  };

  render() {
    const state = this.state;

    if (!state.babel.isLoaded) {
      let message = "Loading Babel...";

      if (state.babel.didError) {
        message =
          state.babel.errorMessage ||
          "An error occurred while loading Babel :(";
      }

      return (
        <ReplLoading
          message={message}
          hasError={state.babel.didError}
        ></ReplLoading>
      );
    }

    const options = {
      fileSize: state.fileSize,
      lineWrapping: state.lineWrap,
    };
    return (
      <div className={styles.repl}>
        <ReplOptions
          babelVersion={state.babel.version}
          className={styles.optionsColumn}
          envConfig={state.envConfig}
          envPresetState={state.envPresetState}
          shippedProposalsState={state.shippedProposalsState}
          presetsOptions={state.presetsOptions}
          fileSize={state.fileSize}
          timeTravel={state.timeTravel}
          sourceType={state.sourceType}
          isExpanded={state.isSidebarExpanded}
          lineWrap={state.lineWrap}
          onPresetOptionChange={this._onOptionChange("presetsOptions")}
          onEnvPresetSettingChange={this._onOptionChange("envConfig")}
          onExternalPluginRemove={this.handleRemoveExternalPlugin}
          onIsExpandedChange={this._onIsSidebarExpandedChange}
          onSettingChange={this._onSettingChange}
          onVersionChange={this._onVersionChange}
          pluginState={state.plugins}
          presetState={state.presets}
          runtimePolyfillConfig={runtimePolyfillConfig}
          runtimePolyfillState={state.runtimePolyfillState}
          externalPlugins={state.externalPlugins}
          pluginsLoading={true}
          pluginChange={this._pluginChange}
          pluginSearch={this._pluginSearch}
          pluginValue={state.pluginSearch}
          showOfficialExternalPluginsChanged={
            this._showOfficialExternalPluginsChanged
          }
          showOfficialExternalPlugins={state.showOfficialExternalPlugins}
          loadingExternalPlugins={state.loadingExternalPlugins}
          onAssumptionsChange={this._onAssumptionsChange}
          onResetBtnClick={() => {
            StorageService.remove("replState");
            location.hash = "";
            location.reload();
          }}
        />
        <div className={styles.wrapperPanels}>
          <div
            className={cx(styles.panels, !state.timeTravel && styles.panelsMax)}
          >
            <div className={styles.codePanel}>
              <Tabs
                current={state.leftTab}
                labels={["code", "config"]}
                onClick={(leftTab) => {
                  this.setState({ leftTab });
                }}
              ></Tabs>
              {state.leftTab === "code" && (
                <Monaco
                  filename="input.tsx"
                  code={state.code}
                  errorMessage={state.compileErrorMessage}
                  fileSize={options.fileSize && state.meta.rawSize}
                  lineWrapping={state.lineWrap}
                  onChange={this._updateCode}
                  placeholder="Write code here"
                />
              )}
              {state.leftTab === "config" && (
                <Monaco
                  filename="babel.config.json"
                  code={state.config}
                  errorMessage={state.compileErrorMessage}
                  onChange={this._updateConfig}
                  placeholder="Write config here"
                />
              )}
            </div>
            <div className={styles.codePanel}>
              <Tabs
                current={state.rightTab}
                labels={["code"]}
                onClick={(rightTab) => {
                  this.setState({ rightTab });
                }}
              ></Tabs>
              <Monaco
                filename="output.jsx"
                code={state.compiled}
                errorMessage={state.evalErrorMessage}
                fileSize={options.fileSize && state.meta.compiledSize}
                lineWrapping={state.lineWrap}
                placeholder="Compiled output will be shown here"
              />
            </div>
          </div>
          {state.timeTravel && (
            <TimeTravelSlider
              className={styles.sliders}
              currentTransition={state.currentTransition}
              transitions={state.transitions}
              selectTransition={this.selectTransition}
            />
          )}
        </div>
      </div>
    );
  }

  async _setupBabel(defaultPresets) {
    const babelState = await loadBundle(this.state.babel, this._workerApi);

    if (compareVersions(babelState.version, "7.8.0") === -1) {
      const envState = await this._loadPresetEnvStandalone();

      if (envState.didError) {
        babelState.didError = true;
        babelState.errorMessage =
          babelState.errorMessage || envState.errorMessage;
      }
    }

    this._availablePlugins = await this._workerApi.getAvailablePlugins();

    await loadMonaco();

    const presets = pluginConfigArrayToStateMap(
      babelState.availablePresets,
      defaultPresets
    );

    const newState = {
      babel: babelState,
      presets,
      config: this.state.config,
    };

    if (this.state.config === "{}") {
      Object.assign(
        newState,
        this._stateToConfig({ ...this.state, ...newState })
      );
    }

    this.setState(newState, () => {
      this.setState(this._configToState(newState.config), () => {
        this._loadInitialExternalPlugins();
      });
    });

    this._checkForUnloadedPlugins();
  }

  async _checkForUnloadedPlugins() {
    const { plugins, runtimePolyfillState } = this.state;

    // Assume all default presets are baked into @babel/standalone.
    // We really only need to worry about plugins.
    for (const key in plugins) {
      const plugin = plugins[key];

      if (plugin.isEnabled && !plugin.isLoaded && !plugin.isLoading) {
        this._numLoadingPlugins++;
        this._workerApi.loadPlugin(plugin).then((success) => {
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
    // If no plugins are enabled, immediately invoke a new compilation
    if (this._numLoadingPlugins === 0) {
      this._compileToState();
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
          let evalErrorMessage: string | undefined | null = null;

          if (!this.state.compiled) {
            return;
          }

          // No need to recompile at this point;
          // Just evaluate the most recently compiled code.
          try {
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
  }

  async _loadPresetEnvStandalone() {
    const result = await loadBundle(this.state.envPresetState, this._workerApi);

    if (result.didError) return result;

    const availablePluginsNames = await this._workerApi.getAvailablePlugins();
    const notRegisteredPackages =
      this.state.shippedProposalsState.config.packages
        .filter(
          (packageState) => !availablePluginsNames.includes(packageState.label)
        )
        .map((config) =>
          pluginConfigToState(
            { ...config, version: this.state.babel.version },
            true
          )
        );

    if (notRegisteredPackages.length) {
      const plugins = await Promise.all(
        notRegisteredPackages.map((state) => loadBundle(state, this._workerApi))
      );
      const allPluginsAreLoaded = plugins.every(({ isLoaded }) => isLoaded);
      if (allPluginsAreLoaded) {
        await this._workerApi.registerPlugins(
          plugins.map(({ config }) => ({
            instanceName: config.instanceName,
            pluginName: config.label,
          }))
        );
      } else {
        return {
          didError: true,
          isLoaded: false,
          errorMessage: "Error while loading @babel/preset-env-standalone",
        };
      }
    }

    return { didError: false, isLoaded: true, errorMessage: null };
  }

  _getBundledPluginName(plugin: BabelPlugin) {
    // use available plugins from @babel/standalone for official external plugins
    if (plugin.name.startsWith("@babel/plugin-")) {
      const shorthandName = plugin.name.replace("@babel/plugin-", "");
      if (this._availablePlugins.includes(shorthandName)) {
        return shorthandName;
      }
    }
    return false;
  }

  _loadInitialExternalPlugins = () => {
    return Promise.all(
      this.state.externalPlugins.map((plugin) =>
        this._loadExternalPlugin(plugin).catch()
      )
    );
  };

  _loadExternalPlugin = async (plugin: BabelPlugin) => {
    const shorthandName = this._getBundledPluginName(plugin);
    if (shorthandName) {
      return this._workerApi.registerPluginAlias(plugin.name, shorthandName);
    }

    const bundledUrl = ["https://packd.liuxingbaoyu.xyz"].map(
      (url) => `${url}/${plugin.name}@${plugin.version}`
    );

    return this._workerApi.loadExternalPlugin(bundledUrl).then((loaded) => {
      if (loaded === false) {
        this.setState({
          compileErrorMessage: `Plugin ${plugin.name} could not be loaded`,
        });
        return Promise.reject();
      }
      return this._workerApi.registerPlugins([
        {
          instanceName: toCamelCase(plugin.name),
          pluginName: plugin.version
            ? `${plugin.name}@${plugin.version}`
            : plugin.name,
        },
      ]);
    });
  };

  _pluginSearch = (value) =>
    this.setState({
      pluginSearch: value,
    });

  _pluginChange = (plugin) => {
    const pluginExists =
      this.state.externalPlugins.findIndex(
        (externalPlugin) => externalPlugin.name === plugin.name
      ) > -1;

    if (!pluginExists) {
      this.setState({ loadingExternalPlugins: true });

      const shorthandName = this._getBundledPluginName(plugin);
      if (shorthandName) {
        plugin = { ...plugin, version: "" };
      }

      this._loadExternalPlugin(plugin)
        .then(() => {
          this.setState(
            (state) => ({
              externalPlugins: [...state.externalPlugins, plugin],
            }),
            this._pluginsUpdatedSetStateCallback
          );
        })
        .finally(() => {
          this.setState({
            loadingExternalPlugins: false,
          });
        });
    } else {
      this.handleRemoveExternalPlugin(plugin.name);
    }
  };

  _showOfficialExternalPluginsChanged = () =>
    this.setState((state) => ({
      showOfficialExternalPlugins: !state.showOfficialExternalPlugins,
    }));

  _compile = () => {
    const { state } = this;
    const { runtimePolyfillState } = state;

    const evaluate =
      runtimePolyfillState.isEnabled && runtimePolyfillState.isLoaded;

    let config;
    try {
      config = JSON.parse(state.config);
      if (typeof config !== "object") {
        throw new Error("Must be a JSON object");
      }
    } catch (error) {
      this.setState({
        compileErrorMessage: `Invalid config: ${error.message}`,
      });
      return;
    }

    this._workerApi
      .compile(state.code, {
        evaluate,
        prettify: state.plugins.prettier.isEnabled,
        getTransitions: state.timeTravel,
        babelConfig: config,
      })
      .then((result) => {
        result.meta.compiledSize = prettySize(result.meta.compiledSize);
        result.meta.rawSize = prettySize(result.meta.rawSize);
        this.setState(result, this._persistState);
      });
  };

  // Debounce compilation since it's expensive.
  // This also avoids prematurely warning the user about invalid syntax,
  // eg when in the middle of typing a variable name.
  _compileToState: () => void = debounce(() => this._compile(), DEBOUNCE_DELAY);

  _onOptionChange =
    (kind: "envConfig" | "presetsOptions") => (name: string, value: any) => {
      if (name === "isBuiltInsEnabled") {
        if (value) {
          this.state.envConfig.builtIns ||= envPresetDefaults.builtIns.default;
          this.state.envConfig.corejs ||= envPresetDefaults.corejs.default;
        } else {
          this.state.envConfig.builtIns = false;
          this.state.envConfig.corejs = false;
        }
      }
      if (name === "modules" && value === "false") {
        value = false;
      }
      this.setState(
        // TODO: FIXME
        // @ts-expect-error
        (state) => ({
          [kind]: {
            ...state[kind],
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

  _onSettingChange = (name: string, value: boolean | string) => {
    // TODO: FIXME
    // @ts-expect-error
    this.setState((state) => {
      const { plugins, presets, runtimePolyfillState } = state;

      if (name === "@babel/polyfill") {
        runtimePolyfillState.isEnabled = !!value;

        return {
          runtimePolyfillState,
        };
      } else if (hasOwnProperty(state, name)) {
        return {
          [name]: value,
        };
      } else if (hasOwnProperty(plugins, name)) {
        plugins[name].isEnabled = !!value;

        return {
          plugins,
        };
      } else if (hasOwnProperty(presets, name)) {
        presets[name].isEnabled = !!value;

        return {
          presets,
        };
      }
    }, this._pluginsUpdatedSetStateCallback);
  };

  _onAssumptionsChange = (value: string, isChecked: boolean) => {
    const { assumptions } = this.state.envConfig;
    if (isChecked === true) assumptions[value] = isChecked;
    else delete assumptions[value];
    this.setState((state) => {
      return { envConfig: { ...state.envConfig, assumptions } };
    }, this._pluginsUpdatedSetStateCallback);
  };

  _persistState = () => {
    const { state } = this;
    const { envConfig, plugins } = state;

    const presetsArray = presetsToArray(state.presets);

    const payload = {
      browsers: envConfig.browsers,
      bugfixes: envConfig.isBugfixesEnabled,
      build: state.babel.build,
      assumptions: envConfig.assumptions.length
        ? JSON.stringify(envConfig.assumptions)
        : null,
      builtIns: envConfig.builtIns,
      corejs: envConfig.corejs,
      spec: envConfig.isSpecEnabled,
      loose: envConfig.isLooseEnabled,
      config: JSON.stringify(JSON.parse(state.config)),
      code: state.code,
      modules: envConfig.modules,
      forceAllTransforms: envConfig.forceAllTransforms,
      shippedProposals: envConfig.shippedProposals,
      evaluate: state.runtimePolyfillState.isEnabled,
      fileSize: state.fileSize,
      timeTravel: state.timeTravel,
      sourceType: state.sourceType,
      lineWrap: state.lineWrap,
      presets: presetsArray.join(","),
      prettier: plugins.prettier.isEnabled,
      showSidebar: state.isSidebarExpanded,
      targets: envConfigToTargetsString(envConfig),
      version: state.babel.version,
      decoratorsVersion: state.presetsOptions.decoratorsVersion,
      decoratorsBeforeExport: state.presetsOptions.decoratorsBeforeExport,
      pipelineProposal: state.presetsOptions.pipelineProposal,
      reactRuntime: state.presetsOptions.reactRuntime,
      externalPlugins: state.externalPlugins
        .map((plugin) => `${plugin.name}@${plugin.version}`)
        .join(","),
    };
    StorageService.set("replState", payload);
    UriUtils.updateQuery(payload);
  };

  _onVersionChange = (e: ChangeEvent) => {
    this.setState(
      {
        babel: {
          ...this.state.babel,
          // TODO: FIXME
          // @ts-expect-error
          version: e.target.value,
        },
      },
      () => {
        this._persistState();
        location.reload();
      }
    );
  };

  _pluginsUpdatedSetStateCallback = () => {
    this._checkForUnloadedPlugins();
    this.setState(this._stateToConfig());
    this._updateCode(this.state.code);
  };

  _updateCode = (code: string) => {
    this.setState({ code });
    // Update state with compiled code, errors, etc after a small delay.
    // This prevents frequent updates while a user is typing.
    this._compileToState();
  };

  _updateConfig = (config: string) => {
    this.setState({ config });
    this.setState(this._configToState(config));
    // Update state with compiled code, errors, etc after a small delay.
    // This prevents frequent updates while a user is typing.
    this._compileToState();
  };

  selectTransition = (transition: any) => () => {
    const transitionSize = prettySize(transition.size);
    this.setState((prevState) => ({
      ...prevState,
      currentTransition: transition,
      compiled: transition.code,
      meta: {
        compiledSize: transitionSize,
        rawSize: this.state.meta.rawSize,
      },
    }));
  };

  handleRemoveExternalPlugin = (pluginName: string) => {
    this.setState(
      (state) => ({
        externalPlugins: state.externalPlugins.filter(
          (p) => p.name !== pluginName
        ),
      }),
      this._pluginsUpdatedSetStateCallback
    );
  };
}

export default function ReplWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <Repl />
    </ErrorBoundary>
  );
}

export const styles = {
  codePanel: css({
    flex: "0 0 50%",
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    borderRight: `1px solid var(--ifm-scrollbar-track-background-color)`,
  }),
  optionsColumn: css({
    flex: "0 0 auto",
  }),
  repl: css`
    height: 100%;
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
  wrapperPanels: css({
    height: "100%",
    width: "100%",
    justifyContent: "stretch",
    overflow: "hidden",
  }),
  panels: css({
    height: "85%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "stretch",
    overflow: "auto",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  }),
  panelsMax: css({
    height: "100% !important",
  }),
  sliders: css({
    height: "20%",
    margin: 0,
  }),
};
