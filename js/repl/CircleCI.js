// @flow

function sendRequest(repo: ?string, uri: string): Promise<Object> {
  return new Promise((resolve, reject) => {
    const urlRepo = repo && repo.length ? repo : "babel/babel";
    const fullURL = `https://circleci.com/api/v1.1/project/github/${urlRepo}/${uri}`;
    const xhr = new XMLHttpRequest();
    xhr.open("get", fullURL, true);
    xhr.onload = function() {
      let response;
      try {
        response = JSON.parse(xhr.responseText);
      } catch (ex) {
        reject(new Error("Invalid JSON"));
        return;
      }
      // CircleCI sometimes returns errors as 200 (OK) responses with a "message"
      // field...
      if (response.message) {
        reject(new Error(response.message));
        return;
      }
      resolve(response);
    };
    xhr.onerror = function() {
      reject(new Error("Error sending request to CircleCI :("));
    };
    xhr.send();
  });
}

export async function loadBuildArtifacts(
  repo: ?string,
  build: string,
  cb: (url: string, error?: string) => void
): Promise<string> {
  try {
    const response = await sendRequest(repo, `${build}/artifacts`);
    const artifacts = response.filter(x =>
      /babel-standalone\/babel.js$/.test(x.path)
    );
    if (!artifacts || artifacts.length === 0) {
      throw new Error(
        `Could not find valid babel-standalone artifact in build #${build}`
      );
    }
    return artifacts[0].url;
  } catch (ex) {
    throw new Error(`Could not load Babel build #${build}: ${ex.message}`);
  }
}

export async function loadLatestBuildNumberForBranch(
  repo: ?string,
  branch: string
): Promise<number> {
  try {
    const response = await sendRequest(
      repo,
      `tree/${branch}?limit=1&filter=successful`
    );
    if (!response || !response.length) {
      throw new Error("No builds found");
    }
    return response[0].build_num;
  } catch (ex) {
    throw new Error(
      `Could not load latest Babel build on ${branch}: ${ex.message}`
    );
  }
}
