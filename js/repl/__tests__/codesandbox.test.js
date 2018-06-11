import { setupTranspiler } from "../codesandbox";

describe("setupTranspiler", () => {
  it("works with explicit version passed and env preset", () => {
    const { dependencies, files } = setupTranspiler({
      code: "foo",
      envConfig: {
        browsers: "last 2 versions, > 5%, safari tp",
        isEnvPresetEnabled: true,
      },
      presets: ["react"],
      requestedBabelVersion: "7.0.0-beta.53",
    });

    expect(files["/.codesandbox/transpilers/babel.js"].code).toContain(
      "@babel/core"
    );

    expect(JSON.parse(files["/.babelrc"].code)).toEqual({
      plugins: [],
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              browsers: ["last 2 versions", "> 5%", "safari tp"],
            },
            useBuiltIns: false,
          },
        ],
        "@babel/preset-react",
      ],
      sourceMaps: false,
    });

    expect(dependencies).toEqual({
      assert: "latest",
      "@babel/core": "7.0.0-beta.53",
      "@babel/preset-env": "7.0.0-beta.53",
      "@babel/preset-react": "7.0.0-beta.53",
    });
  });

  it("returns v6 when passed 'latest' and env preset", () => {
    const { dependencies, files } = setupTranspiler({
      code: "foo",
      envConfig: {
        browsers: "last 2 versions, > 5%, safari tp",
        isEnvPresetEnabled: true,
      },
      presets: ["react"],
      requestedBabelVersion: "latest",
    });

    expect(files["/.codesandbox/transpilers/babel.js"].code).toContain(
      "babel-core"
    );

    expect(JSON.parse(files["/.babelrc"].code)).toEqual({
      plugins: [],
      presets: [
        [
          "babel-preset-env",
          {
            targets: {
              browsers: ["last 2 versions", "> 5%", "safari tp"],
            },
            useBuiltIns: false,
          },
        ],
        "babel-preset-react",
      ],
      sourceMaps: false,
    });

    expect(dependencies).toEqual({
      assert: "latest",
      "babel-core": "latest",
      "babel-preset-env": "latest",
      "babel-preset-react": "latest",
    });
  });
});
