// @flow

import camelCase from 'lodash.camelcase';

import type { PluginState } from './types';

type Callback = (success: boolean) => void;

export default function loadPlugin(state: PluginState, callback: Callback) {
  if (state.isLoading) {
    return;
  }

  state.isLoading = true;

  const { config } = state;
  const base = config.baseUrl || 'https://bundle.run';
  const url = `${base}/${config.package}@${config.version}`;

  const onError = event => {
    console.log('window.error', event);
  };

  window.addEventListener('error', onError);

  const script = document.createElement('script');
  script.async = true;
  script.src = url;
  script.onerror = event => {
    state.didError = true;
    state.isLoading = false;

    callback(false);
  };
  script.onload = () => {
    state.isLoaded = true;
    state.isLoading = false;
    state.plugin = window[camelCase(state.config.package)];

    callback(true);
  };

  // $FlowFixMe
  document.head.appendChild(script);
}
