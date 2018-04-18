// @flow
import { loadBuildArtifacts, loadLatestBuildNumberForBranch } from './CircleCI';

const loadBuild = async (
  build: string,
  repoUrl: string,
  packageName: string = "babel-standalone",
) => {
  let b = build;

  // TODO(bng): investigate if we still need this?
  const buildFromPath = window.location.pathname.match(/\/build\/([^/]+)\/?$/);

  if (buildFromPath) {
    b = buildFromPath[1];
  }

  if (!b) return null;

  const isBuildNumeric = /^[0-9]+$/.test(b);

  if (!isBuildNumeric) {
    // Build in URL is *not* numeric, assume it's a branch name
    // Get the latest build number for this branch.
    //
    // NOTE:
    // Since we switched the 7.0 branch to master, we map /build/7.0 to
    // /build/master for backwards compatibility.
    b = await loadLatestBuildNumberForBranch(
      repoUrl,
      b === "7.0" ? "master" : b
    );
  }

  return loadBuildArtifacts(repoUrl, b);
};

export default loadBuild;
