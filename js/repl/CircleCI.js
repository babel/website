// @flow

import fetch from "unfetch";

async function sendRequest(repo: ?string, uri: string): Promise<Object> {
  const urlRepo = repo && repo.length ? repo : "babel/babel";
  const fullURL = `https://circleci.com/api/v1.1/project/github/${urlRepo}/${uri}`;
  let response;
  try {
    response = await fetch(fullURL).then(res => res.json());
  } catch (ex) {
    throw new Error(`Error sending request to CircleCI: ${ex.message}`);
  }
  // CircleCI sometimes returns errors as 200 (OK) responses with a "message"
  // field...
  if (response.message) {
    throw new Error(response.message);
  }
  return response;
}

type BuildArtifacts = {
  babelStandalone: string,
  envStandalone: string,
};

export async function loadBuildArtifacts(
  repo: ?string,
  build: number,
  cb: (url: string, error?: string) => Promise // eslint-disable-line no-unused-vars
): Promise<BuildArtifacts> {
  try {
    const response = await sendRequest(repo, `${build}/artifacts`);

    const result = {
      babelStandalone: null,
      envStandalone: null,
    };

    response.forEach(x => {
      if (x.path.indexOf("babel-standalone/babel.js") > -1) {
        result.babelStandalone = x.url;
      } else if (
        x.path.indexOf("babel-preset-env-standalone/babel-preset-env.js") > -1
      ) {
        result.envStandalone = x.url;
      }
    });

    if (!result.babelStandalone) {
      throw new Error(
        `Could not find valid babel-standalone artifact in build #${build}`
      );
    }

    if (!result.envStandalone) {
      throw new Error(
        `Could not find valid babel-preset-env-standalone artifact in build #${build}`
      );
    }

    return result;
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
      `Could not load latest Babel build on branch "${branch}": ${ex.message}`
    );
  }
}
