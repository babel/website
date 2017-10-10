import { loadBuildArtifacts, loadLatestBuildNumberForBranch } from "./CircleCI";
import { BabelState, PluginConfig } from "./types";
import WorkerApi from "./WorkerApi";

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

        // Incoming version might be unspecific (eg "6")
        // Resolve to a more specific version to show in the UI.
        return workerApi.getBundleVersion(config.instanceName).then(version => {
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
        // Get the latest build number for this branch
        build = await loadLatestBuildNumberForBranch(state.circleciRepo, build);
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
  const url = `${base}/${config.package}@${version || ""}`;

  return doLoad(url);
}
