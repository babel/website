import semver from "semver";
import { loadBuildArtifacts, loadLatestBuildNumberForBranch } from "./CircleCI";
import { BabelState } from "./types";
import WorkerApi from "./WorkerApi";

const DEFAULT_BABEL_VERSION = "6";

export default async function loadBabel(
  config: BabelState,
  workerApi: WorkerApi
): Promise<BabelState> {
  function doLoad(url, error, requestedVersion) {
    return workerApi.loadScript(url).then(success => {
      if (success) {
        config.isLoaded = true;
        config.isLoading = false;

        return Promise.all([
          // Incoming version might be unspecific (eg "6")
          // Resolve to a more specific version to show in the UI.
          workerApi.getBabelVersion(),
          workerApi.getAvailablePresets(),
        ]).then(([version, presets]) => {
          config.availablePresets = presets;
          // Bundles from Babel releases contain previous version because of publishing process bug.
          const useRequestedVersion =
            semver.valid(requestedVersion) && requestedVersion !== version;
          config.version = useRequestedVersion ? requestedVersion : version;
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

  const babelStandalone =
    (semver.valid(version) && semver.gte(version, "7.0.0-beta.4")) ||
    version >= 7
      ? "@babel/standalone"
      : "babel-standalone";

  return doLoad(
    `https://unpkg.com/${babelStandalone}@${version}/babel.min.js`,
    null,
    version
  );
}
