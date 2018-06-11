// @flow
import semver from "semver";
import { getEnvPresetOptions } from "./Utils";

const replConfig = {
  templateName: "babel-repl",
  templateColor: "#F5DB5F",
  sandpack: {
    defaultExtensions: ["js", "jsx", "ts", "tsx", "json"],
    aliases: {},
    preInstalledDependencies: [],
    transpilers: {
      "\\.jsx?$": ["./transpilers/babel"],
      "\\.json$": ["codesandbox:json"],
      ".*": ["codesandbox:raw"],
    },
  },
};

const stringifiedReplConfig = JSON.stringify(replConfig);

const transpilerSource = (scopeNeeded: boolean = true) => {
  const core = scopeNeeded ? "@babel/core" : "babel-core";

  return `
import { transform, version } from "${core}";

export const name = 'babel';

export const getTranspilerContext = async () => ({
  babelVersion: version,
});

export async function transpile(code, loaderContext) {
  const newCode = transform(code, {
    filename: "/index.js",
    babelrc: true
  });

  loaderContext.addDependency("/.babelrc");

  return { transpiledCode: newCode.code };
}`;
};

const LATEST_IS_V6 = true;

const isBabelScopeNeeded = (requestedBabelVersion: string) => {
  if (LATEST_IS_V6 && requestedBabelVersion === "latest") {
    return false;
  }

  return semver.gte(requestedBabelVersion, "7.0.0-beta.5");
};

const getPackageNameFromKey = (key, scopeNeeded) =>
  scopeNeeded ? `@babel/${key}` : `babel-${key}`;

type TranspilerSetupData = {
  code: string,
  evalEnabled: boolean,
  plugins: Array<string>,
  presets: Array<string>,
  requestedBabelVersion: string,
  sourceType: SourceType,
};

export const setupTranspiler = ({
  code,
  envConfig,
  evalEnabled = false,
  plugins = [],
  presets = [],
  requestedBabelVersion,
  sourceType,
}: TranspilerSetupData) => {
  const scopeNeeded = isBabelScopeNeeded(requestedBabelVersion);

  const dependencies = {
    assert: "latest", // Needed by smooshpack
  };

  const babelrc = {
    plugins: [],
    presets: [],
    sourceMaps: evalEnabled,
    sourceType,
  };

  // core
  dependencies[
    getPackageNameFromKey("core", scopeNeeded)
  ] = requestedBabelVersion;

  // TODO(bng): clean this up
  if (envConfig && envConfig.isEnvPresetEnabled) {
    const envPackage = getPackageNameFromKey("preset-env", scopeNeeded);
    babelrc.presets.push([envPackage, getEnvPresetOptions(envConfig)]);
    dependencies[envPackage] = requestedBabelVersion;
  }

  // presets
  presets.forEach(key => {
    const pkg = getPackageNameFromKey(`preset-${key}`, scopeNeeded);
    dependencies[pkg] = requestedBabelVersion;
    babelrc.presets.push(pkg);
  });

  // plugins
  plugins.forEach(({ name, version }: any) => {
    dependencies[name] = version;
    babelrc.plugins.push(name);
  });

  return {
    dependencies,
    files: {
      "/.codesandbox/template.json": {
        code: stringifiedReplConfig,
      },
      "/.codesandbox/transpilers/babel.js": {
        code: transpilerSource(scopeNeeded),
      },
      "/index.js": { code },
      "/.babelrc": {
        code: JSON.stringify(babelrc),
      },
    },
  };
};
