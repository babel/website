// @flow

import scopedEval from "./scopedEval";
import { registerPromiseWorkerApi } from "./WorkerUtils";

import type { CompileConfig, PluginState } from "./types";
import Evaluator from "./evaluator";

// $FlowFixMe
const WorkerSource = require("worker-loader?inline=true!./Worker");

type PromiseWorkerApi = {
  postMessage(message: Object): Promise<any>,
};

type CompileResult = {
  compiled: ?string,
  compileErrorMessage: ?string,
  envPresetDebugInfo: ?string,
  evalErrorMessage: ?string,
  sourceMap: ?string,
};

/**
 * Interfaces with a web worker to lazy-loads plugins and compile code.
 */
export default class WorkerApi {
  _worker: PromiseWorkerApi = registerPromiseWorkerApi(new WorkerSource());

  compile(code: string, config: CompileConfig): Promise<CompileResult> {
    return this._worker
      .postMessage({
        code,
        method: "compile",
        config,
      })
      .then(
        ({ compiled, compileErrorMessage, envPresetDebugInfo, sourceMap }) => {
          // let evalErrorMessage = null;
          let logs = [];
          // Compilation is done in a web worker for performance reasons,
          // But eval requires the UI thread so code can access globals like window.
          if (config.evaluate) {
            const evaluator = new Evaluator();
            try {
              evaluator.evaluate(compiled);
              logs = evaluator.getLogs();
              scopedEval.execute(compiled, sourceMap);
            } catch (error) {
              // evalErrorMessage = error.message;
            }
          }

          return {
            compiled,
            compileErrorMessage,
            envPresetDebugInfo,
            logs,
            sourceMap,
          };
        }
      );
  }

  getBabelVersion(): Promise<string> {
    return this._worker.postMessage({ method: "getBabelVersion" });
  }

  loadPlugin(state: PluginState): Promise<boolean> {
    const { config } = state;

    const base = config.baseUrl || "https://bundle.run";
    const url = `${base}/${config.package}@${config.version || ""}`;

    state.isLoading = true;

    return this.loadScript(url).then(success => {
      if (success) {
        state.isLoaded = true;
        state.isLoading = false;
      } else {
        state.didError = true;
        state.isLoading = false;
      }

      return success;
    });
  }

  loadScript(url: string): Promise<boolean> {
    return this._worker.postMessage({
      method: "loadScript",
      url,
    });
  }

  registerEnvPreset(): Promise<boolean> {
    return this._worker.postMessage({
      method: "registerEnvPreset",
    });
  }
}
