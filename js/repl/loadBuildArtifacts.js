export default function loadBuildArtifacts(
  repo: string,
  build: string,
  cb: (url: string, error: string) => void
) {
  const urlRepo = repo && repo.length ? repo : "babel/babel";

  // Loading a build from CircleCI (eg. for a pull request). We need to
  // first call CircleCI's API to get the URL to the artifact.
  const buildURL = `https://circleci.com/api/v1.1/project/github/${urlRepo}/${build}/artifacts`;

  const xhr = new XMLHttpRequest();
  xhr.open("get", buildURL, true);

  xhr.onload = function() {
    const response = JSON.parse(xhr.responseText);

    let url;
    let error;

    if (response.message) {
      error = `Could not load Babel build #${build}: ${response.message}`;
    } else {
      const artifacts = response.filter(x =>
        /babel-standalone\/babel.js$/.test(x.path)
      );

      if (!artifacts || artifacts.length === 0) {
        error = `Could not find valid babel-standalone artifact in build #${build}`;
      } else {
        url = artifacts[0].url;
      }
    }

    cb(url, error);
  };

  xhr.onerror = function() {
    cb(null, `Could not load Babel build #${build} :(`);
  };

  xhr.send();
}
