import loadBuildArtifacts from "./loadBuildArtifacts";
import { BabelState, LoadScriptCallback } from "./types";
import WorkerApi from "./WorkerApi";

const DEFAULT_BABEL_VERSION = "6";

export default function loadBabel(
  config: BabelState,
  workerApi: WorkerApi,
  cb: (config: BabelState) => void
) {
  function doLoad(url, error) {
    workerApi.loadScript(url, success => {
      if (success) {
        config.isLoaded = true;
        config.isLoading = false;
      } else {
        config.didError = true;
        config.errorMessage = error;
        config.isLoading = false;
      }

      cb(config);
    });
  }

  // See if a CircleCI build number was passed in the path
  // Prod (with URL rewriting): /repl/build/12345/
  // Dev: /repl/#?build=12345
  let build = config.build;

  const buildFromPath = window.location.pathname.match(/\/build\/([0-9]+)\/?$/);

  if (buildFromPath) {
    build = buildFromPath[1];
  }

  if (build) {
    loadBuildArtifacts(config.circleciRepo, build, doLoad);
    return;
  }

  // See if a released version of Babel was passed
  // Prod (with URL rewriting): /repl/version/1.2.3/
  // Dev: /repl/#?version=1.2.3
  const versionFromPath = window.location.pathname.match(/\/version\/(.+)\/?$/);
  if (versionFromPath) {
    config.version = versionFromPath[1];
  }

  // No specific version passed, so just download the latest release.
  if (!config.version) {
    config.version = DEFAULT_BABEL_VERSION;
  }

  doLoad(`https://unpkg.com/babel-standalone@${config.version}/babel.js`);
}
