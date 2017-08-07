// @flow

import { css } from 'glamor';
import React, { Component } from 'react';
import { pluginConfigs, presetPluginConfigs } from './PluginConfig';
import { media } from './styles';

import type { PluginConfig, PluginState, PluginStateMap } from './types';

type ToggleSetting = (name: string, isEnabled: boolean) => void;

type Props = {
  className: string,
  evaluate: boolean,
  lineWrap: boolean,
  pluginState: PluginStateMap,
  presetState: PluginStateMap,
  toggleSetting: ToggleSetting
};

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
      evaluate,
      lineWrap,
      pluginState,
      presetState,
      toggleSetting
    } = this.props;

    return (
      <div className={`${styles.options} ${className}`}>
        <label className={styles.label}>
          <input
            checked={evaluate}
            className={styles.input}
            onChange={this._onEvaluateChange}
            type="checkbox"
          />{' '}
          Evaluate
        </label>
        <strong className={styles.strong}>Presets</strong>
        {presetPluginConfigs.map(config =>
          <PluginToggle
            config={config}
            key={config.package}
            state={presetState[config.package]}
            toggleSetting={toggleSetting}
          />
        )}
        <strong className={styles.strong}>Formatting</strong>
        <label className={styles.label}>
          <input
            checked={lineWrap}
            className={styles.input}
            onChange={this._onLineWrappingChange}
            type="checkbox"
          />{' '}
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
    );
  }

  _onEvaluateChange = (event: SyntheticInputEvent) => {
    this.props.toggleSetting('evaluate', event.target.checked);
  };

  _onLineWrappingChange = (event: SyntheticInputEvent) => {
    this.props.toggleSetting('lineWrap', event.target.checked);
  };
}

type PluginToggleProps = {
  config: PluginConfig,
  state: PluginState,
  toggleSetting: ToggleSetting
};

const PluginToggle = ({ config, state, toggleSetting }: PluginToggleProps) =>
  <label key={config.package} className={styles.label}>
    <input
      checked={state.isEnabled && !state.didError}
      className={styles.input}
      disabled={state.isLoading || state.didError}
      onChange={(event: SyntheticInputEvent) =>
        toggleSetting(config.package, event.target.checked)}
      type="checkbox"
    />
    {state.isLoading ? <LoadingAnimation /> : config.label}
  </label>;

const LoadingAnimation = () =>
  <div className={styles.spinner}>
    <div className={`${styles.tick} ${styles.tick1}`} />
    <div className={`${styles.tick} ${styles.tick2}`} />
    <div className={`${styles.tick} ${styles.tick3}`} />
    <div className={`${styles.tick} ${styles.tick4}`} />
    <div className={`${styles.tick} ${styles.tick5}`} />
  </div>;

const bounce = css.keyframes({
  '0%': { transform: 'scaleY(0.25)' },
  '40%': { transform: 'scaleY(0.75)' },
  '80%': { transform: 'scaleY(0.25)' },
  '100%': { transform: 'scaleY(0.25)' }
});

const styles = {
  label: css({
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    padding: '0 0.5rem',
    height: '2rem',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#292929'
    },

    [media.small]: {
      padding: '0.5rem 0.75rem',
      whiteSpace: 'nowrap'
    }
  }),
  input: css({
    marginRight: '0.5rem'
  }),
  options: css({
    backgroundColor: '#222',
    color: '#fff',
    '-webkit-overflow-scrolling': 'touch'
  }),
  spinner: css({
    height: '2rem',
    display: 'flex',
    alignItems: 'center'
  }),
  tick: css({
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
  tick1: css({
    animationDelay: 0,
    marginLeft: 0
  }),
  tick2: css({
    animationDelay: '-1.1s'
  }),
  tick3: css({
    animationDelay: '-1.0s'
  }),
  tick4: css({
    animationDelay: '-0.9s'
  }),
  tick5: css({
    animationDelay: '-0.8s'
  }),
  strong: css({
    flex: '0 0 auto',
    margin: '0.5rem 0',
    padding: '0.25rem 0.5rem',
    background: '#333',

    [media.small]: {
      padding: '0.75rem',
      margin: 0
    }
  })
};
