// @flow

import semver from "semver";
import { loadBuildArtifacts, loadLatestBuildNumberForBranch } from "./CircleCI";
import type { BabelState } from "./types";
import WorkerApi from "./WorkerApi";

const SCOPED_CORE_VERSION_FROM = "7.0.0-beta.4";
const SCOPED_PRESET_ENV_VERSION_FROM = "7.0.0-beta.33";
const LAST_PRESET_ENV_NO_SCOPE_VERSION = "2.0.0-beta.2";

// There is a gap in preset-env versions. From 2.0.0-beta.2 to 7.0.0-beta.33. We need to handle it.
const formatBundleVersion = (packageName, version) => {
  if (!version) return "";
  if (packageName === "babel-preset-env-standalone") {
    const isUnregistered =
      semver.valid(version) &&
      semver.gt(version, LAST_PRESET_ENV_NO_SCOPE_VERSION) &&
      semver.lt(version, SCOPED_PRESET_ENV_VERSION_FROM);
    return isUnregistered ? LAST_PRESET_ENV_NO_SCOPE_VERSION : version;
  }
  return version;
};

const formatBundleName = (packageName, version) => {
  let minimumScopedVersion = SCOPED_CORE_VERSION_FROM;
  if (packageName === "babel-preset-env-standalone") {
    minimumScopedVersion = SCOPED_PRESET_ENV_VERSION_FROM;
  }
  const isValidOrGreater =
    semver.valid(version) && semver.gte(version, minimumScopedVersion);
  return isValidOrGreater || version >= 7
    ? packageName.replace(/^babel-/, "@babel/")
    : packageName;
};

export default async function loadBundle(
  state: BabelState,
  workerApi: WorkerApi
): Promise<BabelState> {
  const { config } = state;

  function doLoad(url, error) {
    state.isLoading = true;
    return workerApi.loadScript(url).then(success => {
      if (success) {
        state.isLoaded = true;
        state.isLoading = false;

        return Promise.all([
          // Incoming version might be unspecific (eg "6")
          // Resolve to a more specific version to show in the UI.
          workerApi.getBundleVersion(config.instanceName),
          workerApi.getAvailablePresets(),
        ]).then(([version, presets]) => {
          state.availablePresets = presets;
          state.version = version;
          return state;
        });
      } else {
        state.didError = true;
        state.errorMessage = error;
        state.isLoading = false;
        return state;
      }
    });
  }

  // See if a CircleCI build number was passed in the path
  // Prod (with URL rewriting): /repl/build/12345/
  // Dev: /repl/#?build=12345
  let build = state.build;

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
          state.circleciRepo,
          build === "7.0" ? "master" : build
        );
      }
      const packageName = config.package;
      const packageFile = `${packageName.replace(/-standalone/, "")}.js`;
      const regExp = new RegExp(`${packageName}/${packageFile}$`);
      const url = await loadBuildArtifacts(
        state.circleciRepo,
        regExp,
        build,
        doLoad
      );
      return doLoad(url);
    } catch (ex) {
      return doLoad(null, ex.message);
    }
  }

  // See if a released version of Babel was passed
  // Prod (with URL rewriting): /repl/version/1.2.3/
  // Dev: /repl/#?version=1.2.3
  let version = state.version;
  const versionKey = config.versionKey || "version";
  const versionRegExp = new RegExp(`/${versionKey}\/(.+)\/?$`);
  const versionFromPath = window.location.pathname.match(versionRegExp);
  if (versionFromPath) {
    version = versionFromPath[1];
  }

  // No specific version passed, so just download the latest release.
  if (!version) {
    version = config.version;
  }

  const base = config.baseUrl;
  // Override preset-env version to 7.x if babel-core 7.x was loaded.
  if (config.instanceName === "babelPresetEnv") {
    const babelVersion = await workerApi.getBundleVersion("Babel");
    if (parseInt(babelVersion) === 7 && parseInt(version) < 7) {
      version = babelVersion;
    }
  }
  const packageName = formatBundleName(config.package, version);
  const packageVersion = formatBundleVersion(config.package, version);
  const url = `${base}/${packageName}@${packageVersion}`;
  return doLoad(url);
}
