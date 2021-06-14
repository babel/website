// This script generates the last 5, excluding the latest one, minor releases of
// @babel/standalone with highest patch versions. It writes to
// "./js/repl/past-versions.json" which is used by REPL as a version candidates list.
import { exec } from "child_process";
import { writeFile } from "fs/promises";
import { resolve } from "path";

const numOfLatestMinor = 5;

exec(
  "npm view @babel/standalone versions --json",
  async (error, stdout, stderr) => {
    if (error) throw error;
    if (stderr) {
      console.error(stderr);
    }
    // Past versions will hold every published `@babel/standalone` versions
    // in ascending orders
    // e.g.
    // "7.0.0-beta.4",
    // "7.0.0-beta.5",
    // "7.0.0-beta.31",
    // "7.12.17",
    // "7.13.0",
    // "7.13.16",
    // "7.13.17",
    // "7.14.0",
    // "8.0.0",

    const pastVersions = JSON.parse(stdout);
    // The first filtered versions are the latest minor, ignore it since it is covered by
    // the "latest" in REPL UI
    const filteredVersions = [];
    for (
      let i = pastVersions.length - 1, includedSet = new Set();
      i >= 0 && filteredVersions.length < numOfLatestMinor + 1;
      i--
    ) {
      const version = pastVersions[i];
      const majorMinor = version.substring(0, version.lastIndexOf("."));
      if (!includedSet.has(majorMinor)) {
        includedSet.add(majorMinor);
        filteredVersions.push(version);
      }
    }
    const writtenPath = resolve("./js/repl/past-versions.json");
    await writeFile(
      writtenPath,
      JSON.stringify(filteredVersions.slice(1), undefined, 2) + "\n"
    );
    console.log("Past versions written to " + writtenPath);
  }
);
