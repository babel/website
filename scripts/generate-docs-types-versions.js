const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { promisify } = require("util");

const mkdir = promisify(fs.mkdir);
const cp = promisify(fs.copyFile);

const work = (cwd, cmd, argv) =>
  new Promise((resolve, reject) => {
    const worker = spawn(cmd, argv, { cwd, shell: true });

    worker.stdout.on("data", data => {
      console.log(`stdout: ${data.toString()}`);
    });

    worker.stderr.on("data", data => {
      console.log(`stderr: ${data.toString()}`);
    });

    worker.on("close", code => {
      if (code) {
        reject();
      } else {
        resolve();
      }
    });
  });

(async () => {
  try {
    await mkdir(path.resolve(__dirname, "tmp"));
  } catch (error) {
    console.log("failed creating directory tmp");
    console.log(error);
  }
  const latest = "7.5.5";
  const typesVersions = ["7.0.0", "7.2.0", "7.4.0", latest];
  for (const babelVersion of typesVersions) {
    const location = path.resolve(__dirname, "tmp", babelVersion);
    try {
      await mkdir(location);
    } catch (error) {
      console.log("failed creating directory:", location);
      console.log(error);
    }
    await work(location, "yarn", ["init", "-y"]);
    await work(location, "yarn", ["add", `@babel/core@${babelVersion}`]);
    await cp(
      path.resolve(__dirname, "generate-docs-types.js"),
      path.join(location, "generate-docs-types.js")
    );
    await work(location, "node", [
      "generate-docs-types.js",
      babelVersion === latest
        ? ""
        : `--babel-types-id=version-${babelVersion}-babel-types`,
    ]);
    const dest =
      babelVersion === latest
        ? path.resolve(__dirname, "..", "docs", "types.md")
        : path.resolve(
            __dirname,
            "..",
            "website",
            "versioned_docs",
            `version-${babelVersion}`,
            "types.md"
          );
    await cp(path.join(location, "types.md"), dest);
  }
})();
