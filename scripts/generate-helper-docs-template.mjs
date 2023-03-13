import fs from "node:fs";

function createHelperDocsTemplate(helperName) {
  return `---
id: babel-helper-${helperName}
title: "@babel/helper-${helperName}"
sidebar_label: helper-${helperName}
---

:::caution Pending docs
This library is an internal Babel helper. You can check out the [source](https://github.com/babel/babel/tree/main/packages/babel-helper-${helperName}) here.
:::
`;
}

function outputHelperDocs(helperName) {
  const markdownOutput = createHelperDocsTemplate(helperName);
  const path = new URL(`../docs/helper-${helperName}.md`, import.meta.url);
  fs.writeFileSync(path, markdownOutput, { encoding: "utf-8", flag: "wx+" });
  console.log(`Created ${path}`);
}

if (process.argv[2]) {
  const helperName = process.argv[2].replace(/^babel-helper-/, "");
  outputHelperDocs(helperName);
} else {
  console.log(
    "Usage: node ./scripts/generate-helper-docs-template.mjs" +
      " [babel helper name, e.g. annotate-as-pure]"
  );
}
