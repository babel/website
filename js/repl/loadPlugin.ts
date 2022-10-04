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
  const base = config.baseUrl ? [config.baseUrl] : ["https://bundle.run"];
  Array.prototype.push.apply(base, ["https://packd.liuxingbaoyu.xyz"]);

  const urls =
    config.url ||
    base.map((url) => `${url}/${config.package}@${config.version || ""}`);

  loadScript(
    urls,
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
