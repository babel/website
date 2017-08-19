export default function loadBuildArtifacts(
  repo: string = "babel/babel",
  build: string,
  cb: (url: string) => void
) {
  // Loading a build from CircleCI (eg. for a pull request). We need to
  // first call CircleCI's API to get the URL to the artifact.
  const buildURL = `https://circleci.com/api/v1.1/project/github/${repo}/${build}/artifacts`;

  const xhr = new XMLHttpRequest();
  xhr.open("get", buildURL, true);

  xhr.onload = function() {
    const response = JSON.parse(xhr.responseText);
    if (response.message) {
      alert(`Could not load Babel build #${build}: ${response.message}`);
      return;
    }

    const artifacts = response.filter(x =>
      /babel-standalone\/babel.js$/.test(x.path)
    );

    if (!artifacts || artifacts.length === 0) {
      alert(
        `Could not find valid babel-standalone artifact in build #${build}`
      );
      return;
    }

    cb(artifacts[0].url);
  };

  xhr.onerror = function() {
    alert(`Could not load Babel build #${build} :(`);
  };

  xhr.send();
}
