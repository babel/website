// @flow

import { css } from "glamor";
import React, { Component } from "react";
import {
  envPresetDefaults,
  pluginConfigs,
  presetPluginConfigs,
} from "./PluginConfig";
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
  builtIns: boolean,
  className: string,
  debugEnvPreset: boolean,
  envConfig: EnvConfig,
  envPresetState: PluginState,
  isExpanded: boolean,
  lineWrap: boolean,
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
      builtIns,
      debugEnvPreset,
      envConfig,
      envPresetState,
      lineWrap,
      onIsExpandedChange,
      onSettingChange,
      pluginState,
      presetState,
      runtimePolyfillConfig,
      runtimePolyfillState,
    } = this.props;

    const disableEnvSettings =
      !envPresetState.isLoaded || !envConfig.isEnvPresetEnabled;

    return (
      <div className={styles.expandedContainer}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>Settings</div>
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
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>Presets</div>
          {presetPluginConfigs.map(config =>
            <PluginToggle
              config={config}
              key={config.package}
              onSettingChange={onSettingChange}
              state={presetState[config.package]}
            />
          )}
        </div>
        <div className={`${styles.section} ${styles.sectionEnv}`}>
          <label
            className={`${styles.sectionHeader} ${styles.sectionEnvHeader}`}
          >
            {envPresetState.isLoading
              ? <PresetLoadingAnimation />
              : "Env Preset"}

            <input
              checked={envConfig.isEnvPresetEnabled}
              className={styles.envPresetCheckbox}
              type="checkbox"
              onChange={this._onEnvPresetEnabledChange}
            />
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
    minWidth: "150px",
    display: "flex",
    overflow: "auto",
    boxSshadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.24) 0px 1px 4px",

    [media.large]: {
      flexDirection: "column",
      height: "100%",

      [`& .${nestedCloseButton}`]: {
        right: "-1.5rem",
      },
    },

    [media.mediumAndDown]: {
      flexDirection: "row",
      flexWrap: "wrap",
      overflow: "auto",

      [`& .${nestedCloseButton}`]: {
        bottom: "-1.5rem",
      },
    },
  }),
  closeButton: css({
    position: "absolute",
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
  section: css({
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    flex: "0 0 auto",
    maxHeight: "100%",
    padding: "1.5rem",
    zIndex: 7,

    [media.mediumAndDown]: {
      flex: "1 0 100px",
      maxHeight: "100%",
      overflow: "auto",
    },
  }),
  sectionEnv: css({
    borderBottom: "none",
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
  sectionHeader: css({
    flex: "0 0 2.5rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: colors.inverseForegroundLight,
  }),
  sectionEnvHeader: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    margin: "0 0 0 0.75rem !important", // TODO (bvaughn) Override input[type="checkbox"] style in main.css
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
};
