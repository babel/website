// @flow

import { css } from "glamor";
import React, { Component } from "react";
import {
  envPresetDefaults,
  pluginConfigs,
  presetPluginConfigs,
} from "./PluginConfig";
import AccordionTab from "./AccordionTab";
import PresetLoadingAnimation from "./PresetLoadingAnimation";
import Svg from "./Svg";
import { colors, media } from "./styles";

import type {
  EnvConfig,
  PluginConfig,
  PluginState,
  PluginStateMap,
} from "./types";

type ToggleEnvPresetSetting = (name: string, value: any) => void;
type ToggleExpanded = (isExpanded: boolean) => void;
type ToggleSetting = (name: string, isEnabled: boolean) => void;

type Props = {
  babelVersion: ?string,
  builtIns: boolean,
  className: string,
  debugEnvPreset: boolean,
  envConfig: EnvConfig,
  envPresetState: PluginState,
  isExpanded: boolean,
  lineWrap: boolean,
  spec: boolean,
  onEnvPresetSettingChange: ToggleEnvPresetSetting,
  onIsExpandedChange: ToggleExpanded,
  onSettingChange: ToggleSetting,
  pluginState: PluginStateMap,
  presetState: PluginStateMap,
  runtimePolyfillConfig: PluginConfig,
  runtimePolyfillState: PluginState,
};

const ReplOptions = (props: Props) =>
  <div className={`${styles.wrapper} ${props.className}`}>
    {props.isExpanded
      ? <ExpandedContainer {...props} />
      : <CollapsedContainer {...props} />}
  </div>;

export default ReplOptions;

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
      builtIns,
      debugEnvPreset,
      envConfig,
      envPresetState,
      lineWrap,
      spec,
      onIsExpandedChange,
      onSettingChange,
      pluginState,
      presetState,
      runtimePolyfillConfig,
      runtimePolyfillState,
    } = this.props;

    const disableEnvSettings =
      !envPresetState.isLoaded || !envConfig.isEnvPresetEnabled;

    const showSpecOption =
      presetState["babel-preset-es2015"].isEnabled &&
      !envConfig.isEnvPresetEnabled;

    return (
      <div className={styles.expandedContainer}>
        <div className={styles.sectionsWrapper}>
          <AccordionTab
            className={styles.section}
            label="Settings"
            defaultExpanded={true}
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
                onChange={this._onLineWrappingChange}
                className={styles.inputCheckboxLeft}
                type="checkbox"
              />
              Line Wrap
            </label>
            {pluginConfigs.map(config =>
              <PluginToggle
                config={config}
                key={config.package}
                onSettingChange={onSettingChange}
                state={pluginState[config.package]}
              />
            )}
            {showSpecOption
              ? <label className={styles.settingsLabel}>
                  <input
                    checked={spec}
                    onChange={this._onSpecChange}
                    className={styles.inputCheckboxLeft}
                    type="checkbox"
                  />
                  Spec
                </label>
              : null}
          </AccordionTab>
          <AccordionTab className={styles.section} label="Presets">
            <div className={styles.section}>
              {presetPluginConfigs.map(config =>
                <PluginToggle
                  config={config}
                  key={config.package}
                  onSettingChange={onSettingChange}
                  state={presetState[config.package]}
                />
              )}
            </div>
          </AccordionTab>
          <AccordionTab
            className={`${styles.section} ${styles.sectionEnv}`}
            label="Env Preset"
          >
            <label className={styles.settingsLabel}>
              <input
                checked={envConfig.isEnvPresetEnabled}
                className={styles.inputCheckboxLeft}
                type="checkbox"
                onChange={this._onEnvPresetEnabledChange}
              />

              {envPresetState.isLoading
                ? <PresetLoadingAnimation />
                : "Enabled"}
            </label>

            <div className={styles.envPresetColumn}>
              <label
                className={`${styles.envPresetColumnLabel} ${styles.highlight}`}
              >
                Browser
              </label>
              <textarea
                disabled={disableEnvSettings}
                className={styles.envPresetInput}
                onChange={this._onBrowsersChange}
                placeholder={envPresetDefaults.browsers.placeholder}
                value={envConfig.browsers}
              />
            </div>
            <label className={styles.envPresetRow}>
              <span className={`${styles.envPresetLabel} ${styles.highlight}`}>
                Electron
              </span>
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
                onChange={this._onElectronChange}
                value={envConfig.electron}
              />
              <input
                checked={envConfig.isElectronEnabled}
                className={styles.envPresetCheckbox}
                disabled={disableEnvSettings}
                onChange={this._onIsElectronEnabledChange}
                type="checkbox"
              />
            </label>
            <label className={styles.envPresetRow}>
              <span className={`${styles.envPresetLabel} ${styles.highlight}`}>
                Node
              </span>
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
                onChange={this._onNodeChange}
                value={envConfig.node}
              />
              <input
                checked={envConfig.isNodeEnabled}
                className={styles.envPresetCheckbox}
                disabled={disableEnvSettings}
                onChange={this._onIsNodeEnabledChange}
                type="checkbox"
              />
            </label>
            <label className={styles.settingsLabel}>
              <input
                checked={builtIns}
                className={styles.inputCheckboxLeft}
                disabled={runtimePolyfillState.isEnabled || disableEnvSettings}
                onChange={this._onBuiltInsChange}
                type="checkbox"
              />
              Built-ins
            </label>
            <label className={styles.settingsLabel}>
              <input
                checked={debugEnvPreset}
                className={styles.inputCheckboxLeft}
                disabled={disableEnvSettings}
                onChange={this._onDebugChange}
                type="checkbox"
              />
              Debug
            </label>
          </AccordionTab>
        </div>
        <div className={styles.versionAndClassicRow}>
          <a className={styles.classicReplLink} href="/repl-old/">
            <Svg
              className={styles.classicReplSvg}
              path={`
                M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,
                0 21,19V5C21,3.89 20.1,3 19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,
                8.41L12.67,11H3V13H12.67L10.08,15.58Z`}
            />
            classic repl
          </a>
          {babelVersion &&
            <div className={styles.babelVersion} title={`v${babelVersion}`}>
              v{babelVersion}
            </div>}
        </div>
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

  _onBrowsersChange = (event: SyntheticInputEvent) => {
    this.props.onEnvPresetSettingChange("browsers", event.target.value);
  };

  _onEnvPresetEnabledChange = (event: SyntheticInputEvent) => {
    // disable and hide spec option if Env preset is enabled
    if (event.target.checked) {
      this.setState({ spec: false });
    }

    this.props.onEnvPresetSettingChange(
      "isEnvPresetEnabled",
      event.target.checked
    );
  };

  _onBuiltInsChange = (event: SyntheticInputEvent) => {
    this.props.onSettingChange("builtIns", event.target.checked);
  };

  _onDebugChange = (event: SyntheticInputEvent) => {
    this.props.onSettingChange("debugEnvPreset", event.target.checked);
  };

  _onElectronChange = (event: SyntheticInputEvent) => {
    this.props.onEnvPresetSettingChange(
      "electron",
      parseFloat(event.target.value)
    );
  };

  _onIsElectronEnabledChange = (event: SyntheticInputEvent) => {
    this.props.onEnvPresetSettingChange(
      "isElectronEnabled",
      event.target.checked
    );
  };

  _onIsNodeEnabledChange = (event: SyntheticInputEvent) => {
    this.props.onEnvPresetSettingChange("isNodeEnabled", event.target.checked);
  };

  _onLineWrappingChange = (event: SyntheticInputEvent) => {
    this.props.onSettingChange("lineWrap", event.target.checked);
  };

  _onSpecChange = (event: SyntheticInputEvent) => {
    this.props.onSettingChange("spec", event.target.checked);
  };

  _onNodeChange = (event: SyntheticInputEvent) => {
    this.props.onEnvPresetSettingChange("node", parseFloat(event.target.value));
  };
}

type CollapsedContainerProps = {
  onIsExpandedChange: boolean => any,
};

const CollapsedContainer = ({ onIsExpandedChange }: CollapsedContainerProps) =>
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
  </div>;

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
}: PluginToggleProps) =>
  <label key={config.package} className={styles.settingsLabel}>
    <input
      checked={state.isEnabled && !state.didError}
      className={styles.inputCheckboxLeft}
      disabled={state.isLoading || state.didError}
      onChange={(event: SyntheticInputEvent) =>
        onSettingChange(config.package, event.target.checked)}
      type="checkbox"
    />
    {state.isLoading ? <PresetLoadingAnimation /> : label || config.label}
  </label>;

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
  inputCheckboxLeft: css({
    margin: "0 0.75rem 0 0 !important", // TODO (bvaughn) Override input[type="checkbox"] style in main.css
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
  }),
  envPresetCheckbox: css({
    flex: "0 0 auto",
    margin: "0 0.75rem !important", // TODO (bvaughn) Override input[type="checkbox"] style in main.css
  }),
  envPresetLabel: css({
    flex: 1,
  }),
  envPresetInput: css({
    WebkitAppearance: "none",
    border: "none",
    borderRadius: "0.25rem",

    "&:disabled": {
      opacity: 0.5,
    },
  }),
  versionAndClassicRow: css({
    flex: "0 0 2rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0 1.5rem",

    [media.large]: {
      backgroundColor: colors.inverseBackgroundDark,
      margin: 0,
      padding: "1rem 1.5rem",
    },
  }),
  classicReplLink: css({
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: colors.inverseForegroundLight,
    marginRight: "1rem",

    "&:hover": {
      color: colors.inverseForeground,
    },
  }),
  classicReplSvg: css({
    width: "1rem",
    height: "1rem",
    marginRight: "0.5rem",
  }),
  babelVersion: css({
    fontFamily: "monospace",
    fontSize: "1.25rem",
    flex: "0 1 auto",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
};
