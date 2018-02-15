// @flow

import { css } from "emotion";
import React, { Component } from "react";
import { envPresetDefaults, pluginConfigs } from "./PluginConfig";
import { isEnvFeatureSupported } from "./replUtils";
import AccordionTab from "./AccordionTab";
import PresetLoadingAnimation from "./PresetLoadingAnimation";
import ExternalPlugins from "./ExternalPlugins";
import Svg from "./Svg";
import { colors, media } from "./styles";

import type {
  EnvConfig,
  PluginConfig,
  ShippedProposalsState,
  PluginState,
  EnvState,
  PluginStateMap,
} from "./types";

const PRESET_ORDER = [
  "es2015",
  "es2015-loose",
  "es2016",
  "es2017",
  "stage-0",
  "stage-1",
  "stage-2",
  "stage-3",
  "react",
  "flow",
  "typescript",
];

type ToggleEnvPresetSetting = (name: string, value: any) => void;
type ToggleExpanded = (isExpanded: boolean) => void;
type ToggleSetting = (name: string, isEnabled: boolean) => void;
type OnTabExpandedChange = (name: string, isExpanded: boolean) => void;
type ShowOfficialExternalPluginsChanged = (value: string) => void;
type PluginSearch = (value: string) => void;
type PluginChange = (plugin: Object) => void;

type Props = {
  babelVersion: ?string,
  className: string,
  debugEnvPreset: boolean,
  pluginsLoading: boolean,
  pluginValue: string,
  showOfficialExternalPlugins: boolean,
  plugins: Array<Object>,
  pluginChange: PluginChange,
  externalPlugins: Array<Object>,
  showOfficialExternalPluginsChanged: ShowOfficialExternalPluginsChanged,
  envConfig: EnvConfig,
  pluginSearch: PluginSearch,
  envPresetState: EnvState,
  shippedProposalsState: ShippedProposalsState,
  isEnvPresetTabExpanded: boolean,
  isPluginsExpanded: boolean,
  fileSize: boolean,
  isExpanded: boolean,
  isPresetsTabExpanded: boolean,
  isSettingsTabExpanded: boolean,
  lineWrap: boolean,
  onEnvPresetSettingChange: ToggleEnvPresetSetting,
  onIsExpandedChange: ToggleExpanded,
  onSettingChange: ToggleSetting,
  onTabExpandedChange: OnTabExpandedChange,
  pluginState: PluginStateMap,
  presetState: PluginStateMap,
  runtimePolyfillConfig: PluginConfig,
  runtimePolyfillState: PluginState,
  loadingExternalPlugins: boolean,
};

type LinkProps = {
  className?: string,
  children: React$Element<any> | string,
  section: string,
};

const LinkToDocs = ({ className, children, section }: LinkProps) => (
  <a
    className={className}
    target="_blank"
    href={`https://github.com/babel/babel/tree/master/packages/babel-preset-env#${section}`}
  >
    {children}
  </a>
);

export default function ReplOptions(props: Props) {
  return (
    <div className={`${styles.wrapper} ${props.className}`}>
      {props.isExpanded ? (
        <ExpandedContainer {...props} />
      ) : (
        <CollapsedContainer {...props} />
      )}
    </div>
  );
}

// The choice of Component over PureComponent is intentional here.
// It simplifies the re-use of PluginState objects,
// Without requiring gratuitous use of Object-spread.
class ExpandedContainer extends Component {
  props: Props;

  static defaultProps = {
    className: "",
  };

  render() {
    const {
      babelVersion,
      debugEnvPreset,
      envConfig,
      envPresetState,
      shippedProposalsState,
      fileSize,
      isEnvPresetTabExpanded,
      isPluginsExpanded,
      isPresetsTabExpanded,
      isSettingsTabExpanded,
      lineWrap,
      onIsExpandedChange,
      onSettingChange,
      pluginState,
      presetState,
      runtimePolyfillConfig,
      runtimePolyfillState,
      pluginsLoading,
      plugins,
      pluginValue,
      showOfficialExternalPlugins,
      loadingExternalPlugins,
    } = this.props;

    const disableEnvSettings =
      !envPresetState.isLoaded ||
      !envConfig.isEnvPresetEnabled ||
      shippedProposalsState.isLoading;

    return (
      <div className={styles.expandedContainer}>
        <div className={styles.sectionsWrapper}>
          <AccordionTab
            className={styles.section}
            isExpanded={isSettingsTabExpanded}
            label="Settings"
            toggleIsExpanded={this._toggleSettingsTab}
          >
            <PluginToggle
              config={runtimePolyfillConfig}
              label="Evaluate"
              onSettingChange={onSettingChange}
              state={runtimePolyfillState}
            />
            <label className={styles.settingsLabel}>
              <input
                checked={lineWrap}
                onChange={this._onSettingCheck("lineWrap")}
                className={styles.inputCheckboxLeft}
                type="checkbox"
              />
              Line Wrap
            </label>
            {pluginConfigs.map(config => (
              <PluginToggle
                config={config}
                key={config.package}
                onSettingChange={onSettingChange}
                state={pluginState[config.package]}
              />
            ))}
            <label className={styles.settingsLabel}>
              <input
                checked={fileSize}
                onChange={this._onSettingCheck("fileSize")}
                className={styles.inputCheckboxLeft}
                type="checkbox"
              />
              File Size
            </label>
          </AccordionTab>
          <AccordionTab
            className={styles.section}
            isExpanded={isPresetsTabExpanded}
            label="Presets"
            toggleIsExpanded={this._togglePresetsTab}
          >
            {PRESET_ORDER.map(preset => {
              const state = presetState[preset];

              if (!state) return null;

              return (
                <PluginToggle
                  config={state.config}
                  key={preset}
                  onSettingChange={onSettingChange}
                  state={state}
                />
              );
            })}
          </AccordionTab>
          <AccordionTab
            className={`${styles.section} ${styles.sectionEnv}`}
            isExpanded={isEnvPresetTabExpanded}
            label={
              <span>
                Env Preset{" "}
                <small className={styles.accordionLabelVersion}>
                  {envPresetState.version}
                </small>
              </span>
            }
            toggleIsExpanded={this._toggleEnvPresetTab}
          >
            <label className={styles.settingsLabel}>
              <input
                checked={envConfig.isEnvPresetEnabled}
                className={styles.inputCheckboxLeft}
                type="checkbox"
                onChange={this._onEnvPresetSettingCheck("isEnvPresetEnabled")}
              />

              {envPresetState.isLoading ? (
                <PresetLoadingAnimation />
              ) : (
                "Enabled"
              )}
            </label>

            <div className={styles.envPresetColumn}>
              <LinkToDocs
                className={`${styles.envPresetColumnLabel} ${styles.envPresetLabel} ${styles.highlight}`}
                section="browserslist-support"
              >
                Browsers
              </LinkToDocs>
              <textarea
                disabled={disableEnvSettings}
                className={`${styles.envPresetInput} ${styles.envPresetTextarea}`}
                onChange={this._onEnvPresetSettingChange("browsers")}
                placeholder={envPresetDefaults.browsers.placeholder}
                value={envConfig.browsers}
              />
            </div>
            <label className={styles.envPresetRow}>
              <LinkToDocs
                className={`${styles.envPresetLabel} ${styles.highlight}`}
                section="targets"
              >
                Electron
              </LinkToDocs>
              <input
                className={`${styles.envPresetNumber} ${styles.envPresetInput}`}
                disabled={
                  !envPresetState.isLoaded ||
                  !envConfig.isEnvPresetEnabled ||
                  !envConfig.isElectronEnabled
                }
                type="number"
                min={envPresetDefaults.electron.min}
                max={999}
                step={envPresetDefaults.electron.step}
                onChange={this._onEnvPresetSettingChange("electron")}
                value={envConfig.electron}
              />
              <input
                checked={envConfig.isElectronEnabled}
                className={styles.envPresetCheckbox}
                disabled={disableEnvSettings}
                onChange={this._onEnvPresetSettingCheck("isElectronEnabled")}
                type="checkbox"
              />
            </label>
            <label className={styles.envPresetRow}>
              <LinkToDocs
                className={`${styles.envPresetLabel} ${styles.highlight}`}
                section="targetsnode"
              >
                Node
              </LinkToDocs>
              <input
                className={`${styles.envPresetNumber} ${styles.envPresetInput}`}
                disabled={
                  !envPresetState.isLoaded ||
                  !envConfig.isEnvPresetEnabled ||
                  !envConfig.isNodeEnabled
                }
                type="number"
                min={envPresetDefaults.node.min}
                max={999}
                step={envPresetDefaults.node.step}
                onChange={this._onEnvPresetSettingChange("node")}
                value={envConfig.node}
              />
              <input
                checked={envConfig.isNodeEnabled}
                className={styles.envPresetCheckbox}
                disabled={disableEnvSettings}
                onChange={this._onEnvPresetSettingCheck("isNodeEnabled")}
                type="checkbox"
              />
            </label>
            <label className={styles.envPresetRow}>
              <LinkToDocs
                className={`${styles.envPresetLabel} ${styles.highlight}`}
                section="usebuiltins"
              >
                Built-ins
              </LinkToDocs>
              {isEnvFeatureSupported(envConfig.version, "builtInsUsage") && (
                <select
                  value={envConfig.builtIns}
                  className={styles.envPresetSelect}
                  onChange={this._onEnvPresetSettingChange("builtIns")}
                  disabled={
                    !envPresetState.isLoaded ||
                    !envConfig.isEnvPresetEnabled ||
                    !envConfig.isBuiltInsEnabled ||
                    runtimePolyfillState.isEnabled
                  }
                >
                  <option value="entry">Entry</option>
                  <option value="usage">Usage</option>
                </select>
              )}
              <input
                checked={envConfig.isBuiltInsEnabled}
                className={styles.envPresetCheckbox}
                disabled={disableEnvSettings}
                onChange={this._onEnvPresetSettingCheck("isBuiltInsEnabled")}
                type="checkbox"
              />
            </label>
            {isEnvFeatureSupported(envConfig.version, "shippedProposals") && (
              <label className={styles.envPresetRow}>
                {shippedProposalsState.isLoading ? (
                  <span className={styles.envPresetLoaderWrapper}>
                    <PresetLoadingAnimation size={1.6} />
                  </span>
                ) : (
                  <LinkToDocs
                    className={`${styles.envPresetLabel} ${styles.highlight}`}
                    section="shippedProposals"
                  >
                    Shipped Proposals
                  </LinkToDocs>
                )}
                <input
                  checked={envConfig.shippedProposals}
                  className={styles.envPresetCheckbox}
                  // TODO
                  disabled={disableEnvSettings}
                  onChange={this._onEnvPresetSettingCheck("shippedProposals")}
                  type="checkbox"
                />
              </label>
            )}
            {isEnvFeatureSupported(envConfig.version, "forceAllTransforms") && (
              <label className={styles.envPresetRow}>
                <LinkToDocs
                  className={`${styles.envPresetLabel} ${styles.highlight}`}
                  section="forcealltransforms"
                >
                  Force All Transforms
                </LinkToDocs>
                <input
                  checked={envConfig.forceAllTransforms}
                  className={styles.envPresetCheckbox}
                  disabled={disableEnvSettings}
                  onChange={this._onEnvPresetSettingCheck("forceAllTransforms")}
                  type="checkbox"
                />
              </label>
            )}
            {isEnvFeatureSupported(envConfig.version, "debug") && (
              <label className={styles.settingsLabel}>
                <input
                  checked={debugEnvPreset}
                  className={styles.inputCheckboxLeft}
                  disabled={
                    disableEnvSettings || runtimePolyfillState.isEnabled
                  }
                  onChange={this._onSettingCheck("debugEnvPreset")}
                  type="checkbox"
                />
                Debug
              </label>
            )}
          </AccordionTab>

          <ExternalPlugins
            loadingExternalPlugins={loadingExternalPlugins}
            isPluginsExpanded={isPluginsExpanded}
            _togglePluginsTab={this._togglePluginsTab}
            _pluginNameChanged={this._pluginNameChanged}
            _onshowOfficialExternalPluginsChanged={
              this._onshowOfficialExternalPluginsChanged
            }
            _pluginChanged={this._pluginChanged}
            pluginValue={pluginValue}
            showOfficialExternalPlugins={showOfficialExternalPlugins}
            pluginsLoading={pluginsLoading}
            plugins={plugins}
            styles={styles}
          />
        </div>
        {babelVersion && (
          <div className={styles.versionRow} title={`v${babelVersion}`}>
            v{babelVersion}
          </div>
        )}
        <div
          className={`${styles.closeButton} ${nestedCloseButton}`}
          onClick={() => onIsExpandedChange(false)}
        >
          <Svg
            className={styles.closeButtonIcon}
            path="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
          />
        </div>
      </div>
    );
  }

  _onEnvPresetSettingChange = (type: string) => (
    event: SyntheticInputEvent
  ) => {
    this.props.onEnvPresetSettingChange(type, event.target.value);
  };

  _onEnvPresetSettingCheck = (type: string) => (event: SyntheticInputEvent) => {
    this.props.onEnvPresetSettingChange(type, event.target.checked);
  };

  _onSettingCheck = (type: string) => (event: SyntheticInputEvent) => {
    this.props.onSettingChange(type, event.target.checked);
  };

  _toggleEnvPresetTab = () => {
    this.props.onTabExpandedChange(
      "isEnvPresetTabExpanded",
      !this.props.isEnvPresetTabExpanded
    );
  };

  _togglePluginsTab = () => {
    this.props.onTabExpandedChange(
      "isPluginsExpanded",
      !this.props.isPluginsExpanded
    );
  };

  _togglePresetsTab = () => {
    this.props.onTabExpandedChange(
      "isPresetsTabExpanded",
      !this.props.isPresetsTabExpanded
    );
  };

  _pluginNameChanged = value => {
    this.props.pluginSearch(value);
  };

  _onshowOfficialExternalPluginsChanged = value => {
    this.props.showOfficialExternalPluginsChanged(value);
  };

  _toggleSettingsTab = () => {
    this.props.onTabExpandedChange(
      "isSettingsTabExpanded",
      !this.props.isSettingsTabExpanded
    );
  };

  _pluginChanged = (e, plugin) => {
    const on = e.target.value === "on";
    const externalPlugins = this.props.externalPlugins;
    if (!externalPlugins[plugin.name] && on) {
      this.props.pluginChange(plugin);
    }
  };
}

type CollapsedContainerProps = {
  onIsExpandedChange: boolean => any,
};

const CollapsedContainer = ({
  onIsExpandedChange,
}: CollapsedContainerProps) => (
  <div className={styles.collapsedContainer}>
    <div
      className={`${styles.closeButton} ${nestedCloseButton}`}
      onClick={() => onIsExpandedChange(true)}
    >
      <Svg
        className={styles.closeButtonIcon}
        path="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
      />
    </div>
  </div>
);

type PluginToggleProps = {
  config: PluginConfig,
  label?: string,
  state: PluginState,
  onSettingChange: ToggleSetting,
};

const PluginToggle = ({
  config,
  label,
  state,
  onSettingChange,
}: PluginToggleProps) => (
  <label key={config.label} className={styles.settingsLabel}>
    <input
      checked={state.isEnabled && !state.didError}
      className={styles.inputCheckboxLeft}
      disabled={state.isLoading || state.didError}
      onChange={(event: SyntheticInputEvent) =>
        onSettingChange(config.package || config.label, event.target.checked)}
      type="checkbox"
    />
    {state.isLoading ? <PresetLoadingAnimation /> : label || config.label}
  </label>
);

// Defined separately from styles due to nesting.
const nestedCloseButton = css({});

const styles = {
  wrapper: css({
    position: "relative",
    overflow: "visible",
    zIndex: 6,
    backgroundColor: colors.inverseBackground,
    color: colors.inverseForegroundLight,
    transition: "transform 0.25s ease-in-out",

    [media.large]: {
      height: "100%", // Safari fix for scrolling/overflow
    },
  }),
  collapsedContainer: css({
    backgroundColor: colors.inverseBackground,

    [media.large]: {
      width: "0.5rem",
      height: "100%",
    },

    [media.mediumAndDown]: {
      height: "0.5rem",
      width: "100%",
    },

    [`& .${nestedCloseButton}`]: {
      [media.mediumAndDown]: {
        transition: "top 0.25s ease-in-out",
        top: "-0.5rem",
      },

      [media.large]: {
        transition: "left 0.25s ease-in-out",
        left: "-0.5rem",
      },
    },

    "&:hover": {
      [`& .${nestedCloseButton}`]: {
        [media.mediumAndDown]: {
          top: 0,
        },

        [media.large]: {
          left: 0,
        },
      },
    },
  }),
  expandedContainer: css({
    flexDirection: "column",
    display: "flex",
    overflow: "auto",
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.24) 0px 1px 4px",

    [media.large]: {
      height: "100%",
      width: "20rem",

      [`& .${nestedCloseButton}`]: {
        right: "-2rem",
      },
    },

    [media.mediumAndDown]: {
      [`& .${nestedCloseButton}`]: {
        bottom: "-1.5rem",
      },
    },
  }),
  closeButton: css({
    position: "absolute",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: colors.inverseBackground,
    color: colors.inverseForegroundLight,

    [media.large]: {
      height: "5rem",
      width: "3rem",
      top: "calc(50% - 3rem)",
      borderTopRightRadius: "5rem",
      borderBottomRightRadius: "5rem",
    },

    [media.mediumAndDown]: {
      height: "3rem",
      width: "5rem",
      left: "calc(50% - 3rem)",
      borderBottomLeftRadius: "5rem",
      borderBottomRightRadius: "5rem",
    },
  }),
  closeButtonIcon: css({
    width: "2rem",
    height: "2rem",

    [media.mediumAndDown]: {
      transform: "rotate(90deg)",
    },
  }),
  sectionsWrapper: css({
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",

    [media.large]: {
      display: "block",
    },

    [media.small]: {
      maxHeight: "300px",
      display: "block",
      overflow: "auto",
      "-webkit-overflow-scrolling": "touch",
    },
  }),
  section: css({
    position: "relative",
    zIndex: 7,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    flex: "0 0 auto",
    maxHeight: "100%",

    [media.mediumAndDown]: {
      flex: "1 0 100px",
      maxHeight: "100%",
      overflow: "auto",
    },
  }),
  sectionEnv: css({
    borderRight: "none",

    [media.mediumAndDown]: {
      flex: "1 0 150px",
    },
  }),
  pluginRow: css({
    display: "block",
  }),
  pluginContainer: css({
    display: "block",
    maxHeight: 300,
    overflow: "auto",
    overflowX: "hidden",
  }),
  pluginsHeader: css({
    display: "flex",
    justifyContent: "space-between",
    paddingRight: 5,
  }),
  accordionLabelVersion: css({
    fontSize: "1rem",
    fontWeight: 400,
    marginLeft: "2px",
  }),
  inputCheckboxLeft: css({
    margin: "0 0.75rem 0 0 !important", // TODO (bvaughn) Override input[type="checkbox"] style in main.css

    "&:disabled": {
      opacity: 0.5,
    },
  }),
  highlight: css({
    textTransform: "uppercase",
    fontSize: "1rem",
    fontWeight: "bold",
    color: colors.inverseForeground,
  }),
  settingsLabel: css({
    flex: "0 0 2.5rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "0 -1.5rem",
    padding: "0 1.5rem",
    transition: "background-color 250ms ease-in-out, color 250ms ease-in-out",
    fontWeight: "normal",

    "&:hover": {
      backgroundColor: colors.inverseBackgroundDark,
      color: colors.inverseForeground,
    },
  }),
  envPresetColumn: css({
    display: "flex",
    flexDirection: "column",
    margin: "0.75rem 0",
    flex: "0 0 auto",
  }),
  envPresetColumnLabel: css({
    margin: "0.75rem 0",
  }),
  envPresetRow: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: "0 0 auto",
    margin: "0.75rem 0",
  }),
  envPresetNumber: css({
    flex: "0 0 4rem",
    maxWidth: "4rem",
    paddingLeft: "0.75rem",
  }),
  pluginName: css({
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
  }),
  envPresetCheckbox: css({
    flex: "0 0 auto",
    margin: "0 0 0 0.75rem !important", // TODO (bvaughn) Override input[type="checkbox"] style in main.css
  }),
  envPresetLabel: css({
    flex: 1,
    color: "#FFF",

    ":hover": {
      textDecoration: "none",
      color: "#FFF",
    },
  }),
  envPresetSelect: css({
    maxWidth: "7rem",
    fontWeight: 400,
    color: colors.textareaForeground,

    "&:disabled": {
      opacity: 0.5,
    },
  }),
  envPresetTextarea: css({
    resize: "vertical",
  }),
  envPresetInput: css({
    WebkitAppearance: "none",
    border: "none",
    fontWeight: 400,
    borderRadius: "0.25rem",
    color: colors.textareaForeground,

    "&:disabled": {
      opacity: 0.5,
    },
  }),
  pluginsSearch: css({
    paddingBottom: 10,
    marginBottom: 10,
    borderBottom: `1px solid ${colors.inverseBackgroundDark}`,
  }),
  envPresetLoaderWrapper: css({
    display: "flex",
    flex: "1 1 auto",
  }),
  versionRow: css({
    display: "flex",
    fontFamily: "monospace",
    fontSize: "1.25rem",
    justifyContent: "flex-end",
    overflow: "hidden",
    padding: "0 1.5rem",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    [media.large]: {
      backgroundColor: colors.inverseBackgroundDark,
      justifyContent: "flex-start",
      margin: 0,
      padding: "1rem 1.5rem",
    },
  }),
  checkboxOfficial: css({
    marginTop: 10,
    marginBottom: 10,
  }),
};
