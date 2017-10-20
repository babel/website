import { loadBuildArtifacts, loadLatestBuildNumberForBranch } from "./CircleCI";
import { BabelState, LoadScriptCallback } from "./types";
import WorkerApi from "./WorkerApi";

const DEFAULT_BABEL_VERSION = "6";

export default async function loadBabel(
  config: BabelState,
  workerApi: WorkerApi
): Promise<BabelState> {
  function doLoad(url, error) {
    return workerApi.loadScript(url).then(success => {
      if (success) {
        config.isLoaded = true;
        config.isLoading = false;

        // Incoming version might be unspecific (eg "6")
        // Resolve to a more specific version to show in the UI.
        return workerApi.getBabelVersion().then(version => {
          config.version = version;
          return config;
        });
      } else {
        config.didError = true;
        config.errorMessage = error;
        config.isLoading = false;
        return config;
      }
    });
  }

  // See if a CircleCI build number was passed in the path
  // Prod (with URL rewriting): /repl/build/12345/
  // Dev: /repl/#?build=12345
  let build = config.build;

  const buildFromPath = window.location.pathname.match(/\/build\/([^/]+)\/?$/);

  if (buildFromPath) {
    build = buildFromPath[1];
  }

  if (build) {
    const isBuildNumeric = /^[0-9]+$/.test(build);
    try {
      if (!isBuildNumeric) {
        // Build in URL is *not* numeric, assume it's a branch name
        // Get the latest build number for this branch.
        //
        // NOTE:
        // Since we switched the 7.0 branch to master, we map /build/7.0 to
        // /build/master for backwards compatibility.
        build = await loadLatestBuildNumberForBranch(
          config.circleciRepo,
          build === "7.0" ? "master" : build
        );
      }
      const url = await loadBuildArtifacts(config.circleciRepo, build, doLoad);
      return doLoad(url);
    } catch (ex) {
      return doLoad(null, ex.message);
    }
  }

  // See if a released version of Babel was passed
  // Prod (with URL rewriting): /repl/version/1.2.3/
  // Dev: /repl/#?version=1.2.3
  let version = config.version;

  const versionFromPath = window.location.pathname.match(/\/version\/(.+)\/?$/);
  if (versionFromPath) {
    version = versionFromPath[1];
  }

  // No specific version passed, so just download the latest release.
  if (!version) {
    version = DEFAULT_BABEL_VERSION;
  }

  return doLoad(`https://unpkg.com/babel-standalone@${version}/babel.min.js`);
}
