import loadScript from "./loadScript";

import type { LoadScriptCallback, PluginState } from "./types";

export default function loadPlugin(
  state: PluginState,
  callback: LoadScriptCallback,
  target?: HTMLIFrameElement | null
) {
  if (state.isLoading) {
    return;
  }

  state.isLoading = true;

  const { config } = state;

  loadScript(
    config.url,
    (success) => {
      if (success) {
        state.isLoaded = true;
        state.isLoading = false;
      } else {
        state.didError = true;
        state.isLoading = false;
      }

      callback(success);
    },
    target
  );
}
