// @flow

import { css } from 'glamor';
import React, { Component } from 'react';
import {
  envPresetDefaults,
  pluginConfigs,
  presetPluginConfigs
} from './PluginConfig';
import PresetLoadingAnimation from './PresetLoadingAnimation';
import Svg from './Svg';
import { colors, media } from './styles';

import type {
  EnvConfig,
  PluginConfig,
  PluginState,
  PluginStateMap
} from './types';

type ToggleEnvPresetSetting = (name: string, value: any) => void;
type ToggleExpanded = (isExpanded: boolean) => void;
type ToggleSetting = (name: string, isEnabled: boolean) => void;

type Props = {
  builtIns: boolean,
  className: string,
  envConfig: EnvConfig,
  envPresetState: PluginState,
  isExpanded: boolean,
  lineWrap: boolean,
  pluginState: PluginStateMap,
  presetState: PluginStateMap,
  runtimePolyfillConfig: PluginConfig,
  runtimePolyfillState: PluginState,
  toggleEnvPresetSetting: ToggleEnvPresetSetting,
  toggleIsExpanded: ToggleExpanded,
  toggleSetting: ToggleSetting
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
    className: ''
  };

  render() {
    const {
      builtIns,
      envConfig,
      envPresetState,
      lineWrap,
      pluginState,
      presetState,
      runtimePolyfillConfig,
      runtimePolyfillState,
      toggleEnvPresetSetting,
      toggleIsExpanded,
      toggleSetting
    } = this.props;

    return (
      <div className={styles.expandedContainer}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>Settings</div>
          <PluginToggle
            config={runtimePolyfillConfig}
            label="Evaluate"
            state={runtimePolyfillState}
            toggleSetting={toggleSetting}
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
              state={pluginState[config.package]}
              toggleSetting={toggleSetting}
            />
          )}
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>Presets</div>
          {presetPluginConfigs.map(config =>
            <PluginToggle
              config={config}
              key={config.package}
              state={presetState[config.package]}
              toggleSetting={toggleSetting}
            />
          )}
        </div>
        <div className={`${styles.section} ${styles.sectionEnv}`}>
          <label
            className={`${styles.sectionHeader} ${styles.sectionEnvHeader}`}
          >
            {envPresetState.isLoading
              ? <PresetLoadingAnimation />
              : 'Env Preset'}

            <input
              checked={envConfig.isEnvPresetEnabled}
              type="checkbox"
              onChange={(event: SyntheticInputEvent) =>
                toggleEnvPresetSetting(
                  'isEnvPresetEnabled',
                  event.target.checked
                )}
            />
          </label>
          <label className={styles.settingsLabel}>
            <input
              checked={builtIns}
              className={styles.inputCheckboxLeft}
              disabled={
                runtimePolyfillState.isEnabled || !envPresetState.isLoaded || !envConfig.isEnvPresetEnabled
              }
              onChange={this._onBuiltInsChange}
              type="checkbox"
            />
            Built-ins
          </label>
          <div className={styles.envPresetColumn}>
            <label
              className={`${styles.envPresetColumnLabel} ${styles.highlight}`}
            >
              Browser
            </label>
            <textarea
              disabled={
                !envPresetState.isLoaded || !envConfig.isEnvPresetEnabled
              }
              className={styles.envPresetInput}
              onChange={(event: SyntheticInputEvent) =>
                toggleEnvPresetSetting('browsers', event.target.value)}
              placeholder={envPresetDefaults.browsers.placeholder}
              value={envConfig.browsers}
            />
          </div>
          <label className={styles.envPresetRow}>
            <span className={`${styles.envPresetLabel} ${styles.highlight}`}>
              Electron
            </span>
            <input
              className={`${styles.envPresetText} ${styles.envPresetInput}`}
              disabled={
                !envPresetState.isLoaded ||
                !envConfig.isEnvPresetEnabled ||
                !envConfig.isElectronEnabled
              }
              type="number"
              min={envPresetDefaults.electron.min}
              max={999}
              step={envPresetDefaults.electron.step}
              onChange={(event: SyntheticInputEvent) =>
                toggleEnvPresetSetting(
                  'electron',
                  parseFloat(event.target.value)
                )}
              value={envConfig.electron}
            />
            <input
              checked={envConfig.isElectronEnabled}
              className={styles.envPresetCheckbox}
              disabled={
                !envPresetState.isLoaded || !envConfig.isEnvPresetEnabled
              }
              onChange={(event: SyntheticInputEvent) =>
                toggleEnvPresetSetting(
                  'isElectronEnabled',
                  event.target.checked
                )}
              type="checkbox"
            />
          </label>
          <label className={styles.envPresetRow}>
            <span className={`${styles.envPresetLabel} ${styles.highlight}`}>
              Node
            </span>
            <input
              className={`${styles.envPresetText} ${styles.envPresetInput}`}
              disabled={
                !envPresetState.isLoaded ||
                !envConfig.isEnvPresetEnabled ||
                !envConfig.isNodeEnabled
              }
              type="number"
              min={envPresetDefaults.node.min}
              max={999}
              step={envPresetDefaults.node.step}
              onChange={(event: SyntheticInputEvent) =>
                toggleEnvPresetSetting('node', parseFloat(event.target.value))}
              value={envConfig.node}
            />
            <input
              checked={envConfig.isNodeEnabled}
              className={styles.envPresetCheckbox}
              disabled={
                !envPresetState.isLoaded || !envConfig.isEnvPresetEnabled
              }
              onChange={(event: SyntheticInputEvent) =>
                toggleEnvPresetSetting('isNodeEnabled', event.target.checked)}
              type="checkbox"
            />
          </label>
        </div>

        <div
          className={`${styles.closeButton} ${nestedCloseButton}`}
          onClick={() => toggleIsExpanded(false)}
        >
          <Svg
            className={styles.closeButtonIcon}
            path="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
          />
        </div>
      </div>
    );
  }

  _onBuiltInsChange = (event: SyntheticInputEvent) => {
    this.props.toggleSetting('builtIns', event.target.checked);
  };

  _onLineWrappingChange = (event: SyntheticInputEvent) => {
    this.props.toggleSetting('lineWrap', event.target.checked);
  };
}

const CollapsedContainer = ({ toggleIsExpanded }) =>
  <div className={styles.collapsedContainer}>
    <div
      className={`${styles.closeButton} ${nestedCloseButton}`}
      onClick={() => toggleIsExpanded(true)}
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
  toggleSetting: ToggleSetting
};

const PluginToggle = ({
  config,
  label,
  state,
  toggleSetting
}: PluginToggleProps) =>
  <label key={config.package} className={styles.settingsLabel}>
    <input
      checked={state.isEnabled && !state.didError}
      className={styles.inputCheckboxLeft}
      disabled={state.isLoading || state.didError}
      onChange={(event: SyntheticInputEvent) =>
        toggleSetting(config.package, event.target.checked)}
      type="checkbox"
    />
    {state.isLoading ? <PresetLoadingAnimation /> : label || config.label}
  </label>;

// Defined separately from styles due to nesting.
const nestedCloseButton = css({});

const styles = {
  wrapper: css({
    position: 'relative',
    overflow: 'visible',
    zIndex: 6,
    backgroundColor: colors.inverseBackground,
    color: colors.inverseForegroundLight,
    transition: 'transform 0.25s ease-in-out'
  }),
  collapsedContainer: css({
    backgroundColor: colors.inverseBackground,

    [media.large]: {
      width: '0.5rem',
      height: '100%'
    },

    [media.mediumAndDown]: {
      height: '0.5rem',
      width: '100%'
    },

    [`& .${nestedCloseButton}`]: {
      [media.mediumAndDown]: {
        transition: 'top 0.25s ease-in-out',
        top: '-0.5rem'
      },

      [media.large]: {
        transition: 'left 0.25s ease-in-out',
        left: '-0.5rem'
      }
    },

    '&:hover': {
      [`& .${nestedCloseButton}`]: {
        [media.mediumAndDown]: {
          top: 0
        },

        [media.large]: {
          left: 0
        }
      }
    }
  }),
  expandedContainer: css({
    minWidth: '150px',
    display: 'flex',
    overflow: 'auto',
    boxSshadow:
      'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.24) 0px 1px 4px',

    [media.large]: {
      flexDirection: 'column',
      height: '100%',

      [`& .${nestedCloseButton}`]: {
        right: '-1.5rem'
      }
    },

    [media.mediumAndDown]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      overflow: 'auto',

      [`& .${nestedCloseButton}`]: {
        bottom: '-1.5rem'
      }
    }
  }),
  closeButton: css({
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: colors.inverseBackground,
    color: colors.inverseForegroundLight,

    [media.large]: {
      height: '4rem',
      width: '2rem',
      top: 'calc(50% - 2rem)',
      borderTopRightRadius: '4rem',
      borderBottomRightRadius: '4rem'
    },

    [media.mediumAndDown]: {
      height: '2rem',
      width: '4rem',
      left: 'calc(50% - 2rem)',
      borderBottomLeftRadius: '4rem',
      borderBottomRightRadius: '4rem'
    }
  }),
  closeButtonIcon: css({
    width: '1.5rem',
    height: '1.5rem',

    [media.mediumAndDown]: {
      transform: 'rotate(90deg)'
    }
  }),
  section: css({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    flex: '0 0 auto',
    maxHeight: '100%',
    padding: '1rem',
    zIndex: 7,

    [media.mediumAndDown]: {
      flex: '1 0 100px',
      maxHeight: '100%',
      overflow: 'auto'
    }
  }),
  sectionEnv: css({
    borderBottom: 'none',
    borderRight: 'none',

    [media.mediumAndDown]: {
      flex: '1 0 150px'
    }
  }),
  inputCheckboxLeft: css({
    marginRight: '0.5rem',
  }),
  highlight: css({
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: colors.inverseForeground
  }),
  sectionHeader: css({
    flex: '0 0 2rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: colors.inverseForegroundLight
  }),
  sectionEnvHeader: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }),
  settingsLabel: css({
    flex: '0 0 2rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '0 -1rem',
    padding: '0 1rem',

    '&:hover': {
      backgroundColor: colors.inverseBackgroundDark
    }
  }),
  envPresetColumn: css({
    display: 'flex',
    flexDirection: 'column',
    margin: '0 0 0.5rem',
    flex: '0 0 auto'
  }),
  envPresetColumnLabel: css({
    margin: '0.5rem 0'
  }),
  envPresetRow: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: '0 0 auto',
    margin: '0.5rem 0'
  }),
  envPresetText: css({
    flex: '0 0 auto'
  }),
  envPresetCheckbox: css({
    flex: '0 0 auto',
    marginLeft: '0.5rem'
  }),
  envPresetLabel: css({
    flex: 1
  }),
  envPresetInput: css({
    WebkitAppearance: 'none',
    border: 'none',
    borderRadius: '0.125rem',

    '&:disabled': {
      opacity: 0.5
    }
  })
};
