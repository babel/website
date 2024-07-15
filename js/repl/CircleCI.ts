import fetch from "unfetch";

async function sendRequest(uri: string): Promise<any> {
  const fullURL = `/circleci/api/${uri}`;
  let response;
  try {
    response = await fetch(fullURL).then((res) => res.json());
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

export async function loadBuildArtifacts(
  regExp: RegExp,
  build: number | string
): Promise<string> {
  try {
    const response = await sendRequest(`${build}/artifacts`);
    const artifacts = response.filter((x) => regExp.test(x.path));
    if (!artifacts || artifacts.length === 0) {
      throw new Error(
        `Could not find valid @babel/standalone artifact in build #${build}`
      );
    }
    return artifacts[0].url;
  } catch (ex) {
    throw new Error(`Could not load Babel build #${build}: ${ex.message}`);
  }
}

export async function loadLatestBuildNumberForBranch(
  branch: string,
  jobName: string,
  limit: number = 30
): Promise<number> {
  try {
    const response = await sendRequest(
      `tree/${branch}?limit=${limit}&filter=successful`
    );
    if (!response) throw new Error("No builds found");

    const build = response.find(
      (build) => build.workflows.job_name === jobName
    );
    if (!build) throw new Error(`No builds found (${jobName})`);
    return build.build_num;
  } catch (ex) {
    throw new Error(
      `Could not load latest Babel build on ${branch}: ${ex.message}`
    );
  }
}
