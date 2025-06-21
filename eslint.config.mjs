import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import js from "@eslint/js";

export default defineConfig([
  globalIgnores(["**/node_modules", "website/.docusaurus", "website/build"]),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2025,
        ...globals.browser,
      },

      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  ...typescriptEslint.config({
    files: ["**/*.{ts,tsx}"],
    extends: typescriptEslint.configs.recommended,
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { caughtErrorsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
    },
  }),
  {
    files: ["js/**/*.js", "website/**/*.js"],

    plugins: {
      react: pluginReact,
    },

    rules: {
      ...js.configs.recommended.rules,

      "no-unused-vars": [
        "error",
        { caughtErrorsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],

      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
    },
  },
]);
