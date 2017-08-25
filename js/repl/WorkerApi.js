// @flow

import PromiseWorker from "promise-worker";
import scopedEval from "./scopedEval";

import type { CompileConfig, PluginState, LoadScriptCallback } from "./types";

type CompileCallback = ({
  compiled: ?string,
  compileError: ?string,
  evalError: ?string,
  sourceMap: ?string,
}) => void;

type PromiseWorkerApi = {
  postMessage(message: Object): Promise<any>,
};

/**
 * Interfaces with a web worker to lazy-loads plugins and compile code.
 */
export default class WorkerApi {
  _worker: PromiseWorkerApi;

  constructor() {
    // $FlowFixMe
    const code = require("raw-loader!./Worker");

    let blob;
    try {
      blob = new Blob([code], { type: "application/javascript" });
    } catch (error) {
      // Backwards-compatibility
      const BlobBuilder =
        window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

      blob = new BlobBuilder();
      blob.append(code);
      blob = blob.getBlob();
    }

    this._worker = new PromiseWorker(new Worker(URL.createObjectURL(blob)));
  }

  compile(code: string, config: CompileConfig) {
    return this._worker
      .postMessage({
        code,
        method: "compile",
        presets: config.presets,
        prettify: config.prettify,
        sourceMap: config.sourceMap,
      })
      .then(({ compiled, compileError, sourceMap }) => {
        let evalError = null;

        // Compilation is done in a web worker for performance reasons,
        // But eval requires the UI thread so code can access globals like window.
        if (config.evaluate) {
          try {
            scopedEval(compiled, sourceMap);
          } catch (error) {
            evalError = error.message;
          }
        }

        return {
          compiled,
          compileError,
          evalError,
          sourceMap,
        };
      });
  }

  loadPlugin(state: PluginState, callback: LoadScriptCallback) {
    const { config } = state;

    const base = config.baseUrl || "https://bundle.run";
    const url = `${base}/${config.package}@${config.version || ""}`;

    state.isLoading = true;

    this.loadScript(url, success => {
      if (success) {
        state.isLoaded = true;
        state.isLoading = false;
      } else {
        state.didError = true;
        state.isLoading = false;
      }

      callback(success);
    });
  }

  loadScript(url: string, callback: LoadScriptCallback) {
    this._worker
      .postMessage({
        method: "loadScript",
        url,
      })
      .then(success => {
        callback(success);
      });
  }
}
