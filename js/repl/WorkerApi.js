// @flow

import PromiseWorker from "promise-worker";
import scopedEval from "./scopedEval";

import type { CompileConfig, PluginState, LoadScriptCallback } from "./types";

type CompileCallback = ({
  compiled: ?string,
  compileError: ?Error,
  evalError: ?Error,
  sourceMap: ?string,
}) => void;

/**
 * Interfaces with a web worker to lazy-loads plugins and compile code.
 */
export default class WorkerApi {
  _worker = new PromiseWorker(new Worker("worker.js"));

  async compile(
    code: string,
    config: CompileConfig,
    callback: CompileCallback
  ) {
    const {
      compiled,
      compileError,
      sourceMap,
    } = await this._worker.postMessage({
      code,
      method: "compile",
      presets: config.presets,
      prettify: config.prettify,
      sourceMap: config.sourceMap,
    });

    let evalError = null;

    // Compilation is done in a web worker for performance reasons,
    // But eval requires the UI thread so code can access globals like window.
    if (config.evaluate) {
      try {
        scopedEval(compiled, sourceMap);
      } catch (error) {
        evalError = error;
      }
    }

    callback({
      compiled,
      compileError,
      evalError,
      sourceMap,
    });
  }

  async loadPlugin(state: PluginState, callback: LoadScriptCallback) {
    const { config } = state;

    const base = config.baseUrl || "https://bundle.run";
    const url = `${base}/${config.package}@${config.version || ""}`;

    state.isLoading = true;

    const success = await this._worker.postMessage({
      method: "loadScript",
      url,
    });

    if (success) {
      state.isLoaded = true;
      state.isLoading = false;
    } else {
      state.didError = true;
      state.isLoading = false;
    }

    callback(success);
  }
}
