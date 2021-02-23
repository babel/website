import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "js/cm6.mjs",
  output: {
    file: "website/static/js/build/cm6.mjs",
    format: "es",
    name: "CodeMirror6",
    plugins: process.env.NODE_ENV === "development" ? undefined : [terser()],
  },
  plugins: [nodeResolve()],
};
