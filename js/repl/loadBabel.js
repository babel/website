import loadBuildArtifacts from "./loadBuildArtifacts";
import loadScript from "./loadScript";
import { BabelState, LoadScriptCallback } from "./types";

export default function loadBabel(config: BabelState, cb: LoadScriptCallback) {
  function doLoad(url) {
    loadScript(url, cb);
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
  let version = config.version;

  const versionFromPath = window.location.pathname.match(/\/version\/(.+)\/?$/);

  if (versionFromPath) {
    version = versionFromPath[1];
  }

  // No specific version passed, so just download the latest release.
  if (!version) {
    version = "6"; // This should be changed to "latest" when Babel 7 is stable
  }

  doLoad(`https://unpkg.com/babel-standalone@${version}/babel.js`);
}
