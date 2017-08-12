// @flow

import { css } from 'glamor';
import React, { Component } from 'react';
import {
  envPresetDefaults,
  pluginConfigs,
  presetPluginConfigs
} from './PluginConfig';
import { colors, media } from './styles';

import type {
  EnvConfig,
  PluginConfig,
  PluginState,
  PluginStateMap
} from './types';

type ToggleEnvPresetSetting = (name: string, value: any) => void;
type ToggleSetting = (name: string, isEnabled: boolean) => void;

type Props = {
  className: string,
  envConfig: EnvConfig,
  envPresetState: PluginState,
  lineWrap: boolean,
  pluginState: PluginStateMap,
  presetState: PluginStateMap,
  runtimePolyfillConfig: PluginConfig,
  runtimePolyfillState: PluginState,
  toggleEnvPresetSetting: ToggleEnvPresetSetting,
  toggleSetting: ToggleSetting
};

// TODO Add collapse/expand button (including for mobile)

// The choice of Component over PureComponent is intentional here.
// It simplifies the re-use of PluginState objects,
// Without requiring gratuitous use of Object-spread.
export default class ReplOptions extends Component {
  props: Props;

  static defaultProps = {
    className: ''
  };

  render() {
    const {
      className,
      envConfig,
      envPresetState,
      lineWrap,
      pluginState,
      presetState,
      runtimePolyfillConfig,
      runtimePolyfillState,
      toggleEnvPresetSetting,
      toggleSetting
    } = this.props;

    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>Settings</div>
          <div className={`${styles.secondaryHeader} ${styles.highlight}`}>
            Input
          </div>
          <PluginToggle
            config={runtimePolyfillConfig}
            label="Evaluate"
            state={runtimePolyfillState}
            toggleSetting={toggleSetting}
          />
          <div className={`${styles.secondaryHeader} ${styles.highlight}`}>
            Output
          </div>
          <label className={styles.settingsLabel}>
            <input
              checked={lineWrap}
              onChange={this._onLineWrappingChange}
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
          <div className={styles.sectionHeader}>Env Preset</div>
          <label className={styles.settingsLabel}>
            <input
              checked={envConfig.isEnvPresetEnabled}
              type="checkbox"
              onChange={(event: SyntheticInputEvent) =>
                toggleEnvPresetSetting(
                  'isEnvPresetEnabled',
                  event.target.checked
                )}
            />
            {envPresetState.isLoading ? <LoadingAnimation /> : 'Enabled'}
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
      </div>
    );
  }

  _onLineWrappingChange = (event: SyntheticInputEvent) => {
    this.props.toggleSetting('lineWrap', event.target.checked);
  };
}

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
      disabled={state.isLoading || state.didError}
      onChange={(event: SyntheticInputEvent) =>
        toggleSetting(config.package, event.target.checked)}
      type="checkbox"
    />
    {state.isLoading ? <LoadingAnimation /> : label || config.label}
  </label>;

const LoadingAnimation = () =>
  <div className={styles.loadingAnimation}>
    <div
      className={`${styles.loadingAnimationTick} ${styles.loadingAnimationTick1}`}
    />
    <div
      className={`${styles.loadingAnimationTick} ${styles.loadingAnimationTick2}`}
    />
    <div
      className={`${styles.loadingAnimationTick} ${styles.loadingAnimationTick3}`}
    />
    <div
      className={`${styles.loadingAnimationTick} ${styles.loadingAnimationTick4}`}
    />
    <div
      className={`${styles.loadingAnimationTick} ${styles.loadingAnimationTick5}`}
    />
  </div>;

const bounce = css.keyframes({
  '0%': { transform: 'scaleY(0.25)' },
  '40%': { transform: 'scaleY(0.75)' },
  '80%': { transform: 'scaleY(0.25)' },
  '100%': { transform: 'scaleY(0.25)' }
});

const styles = {
  container: css({
    minWidth: '150px',
    display: 'flex',
    overflow: 'auto',
    backgroundColor: colors.inverseBackground,
    color: colors.inverseForegroundLight,
    boxSshadow:
      'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.24) 0px 1px 4px',

    [media.large]: {
      flexDirection: 'column',
      maxHeight: '100%'
    },

    [media.mediumAndDown]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      overflow: 'auto',
      maxHeight: '50%'
    }
  }),
  section: css({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    flex: '0 0 auto',
    maxHeight: '100%',
    padding: '1rem',
    borderBottom: `1px solid ${colors.inverseBackgroundDark}`,

    [media.mediumAndDown]: {
      flex: '1 0 100px',
      borderRight: `1px solid ${colors.inverseBackgroundDark}`
    },

    '&:last-of-type': {
      borderBottom: 'none',
      borderRight: 'none'
    }
  }),
  sectionEnv: css({
    [media.mediumAndDown]: {
      flex: '1 0 150px'
    }
  }),
  highlight: css({
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: colors.inverseForeground
  }),
  sectionHeader: css({
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: colors.inverseForegroundLight,
    marginBottom: '0.5rem'
  }),
  secondaryHeader: css({
    margin: '1rem 0'
  }),
  settingsLabel: css({
    flex: '0 0 2rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }),
  envPresetColumn: css({
    display: 'flex',
    flexDirection: 'column',
    margin: '0.5rem 0',
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
  }),
  loadingAnimation: css({
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '0.5rem'
  }),
  loadingAnimationTick: css({
    width: '4px',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.25)',
    display: 'inline-block',
    animationName: bounce,
    animationDuration: '1.4s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    marginLeft: '6px'
  }),
  loadingAnimationTick1: css({
    animationDelay: 0,
    marginLeft: 0
  }),
  loadingAnimationTick2: css({
    animationDelay: '-1.1s'
  }),
  loadingAnimationTick3: css({
    animationDelay: '-1.0s'
  }),
  loadingAnimationTick4: css({
    animationDelay: '-0.9s'
  }),
  loadingAnimationTick5: css({
    animationDelay: '-0.8s'
  })
};
