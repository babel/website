import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "js/cm6.mjs",
  output: {
    file: "website/static/js/build/cm6.mjs",
    format: "es",
    name: "CodeMirror6",
  },
  plugins: [nodeResolve()],
};
