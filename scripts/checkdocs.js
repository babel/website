#!/usr/bin/env node

if (process.env.NEXT_DOCS) process.exit();

const fs = require("fs");
const path = require("path");
const sgf = require("staged-git-files");
const chalk = require("chalk");

sgf.includeContent = true;

// Even though we don't care for renamed files, 'R' in filter
// is needed to recognize them as renamed instead of deleted + added
sgf("AMR", function(err, results) {
  const version = "7.1.0";
  const versionFolder = `website/versioned_docs/version-${version}/`;

  const versionedDocs = {};
  const nextDocs = [];

  results.forEach(file => {
    const { status, filename } = file;

    if (status == "Renamed") return;

    const ext = path.extname(filename);
    if (ext !== ".md" && ext !== ".markdown") {
      return;
    }

    if (filename.startsWith(versionFolder)) {
      versionedDocs[path.basename(filename)] = true;
    } else if (filename.startsWith("docs/")) {
      nextDocs.push(file);
    }
  });

  const changedDocs = [];
  nextDocs.forEach(({ filename, status, content }) => {
    if (versionedDocs[path.basename(filename)]) return;

    const doc = docusaurusUtils.extractMetadata(content);
    const metadata = doc.metadata;
    const rawContent = doc.rawContent;

    metadata.original_id = metadata.id;
    metadata.id = `version-${version}-${metadata.id}`;
    const newFilename = versionFolder + path.basename(filename);
    const newContent = docusaurusUtils.makeHeader(metadata) + rawContent;

    fs.writeFileSync(newFilename, newContent);
    changedDocs.push({ status, filename: newFilename });
  });

  if (!changedDocs.length) return;

  console.log(
    chalk`
We noticed changes to some markdown files in the {yellow docs/} folder but no
corresponding changes in {yellow ${versionFolder}}

The following changes have been replicated automatically:
  {green ${changedDocs
    .map(
      ({ status, filename }) =>
        status + " ".repeat(10 - status.length) + filename
    )
    .join("\n  ")}}
    
Please review and stage them, or, if you're sure you only want to modify the
unpublished docs, ignore these files and set the NEXT_DOCS env variable before
commiting again.`
  );

  process.exit(1);
});

const docusaurusUtils = {
  makeHeader(metadata) {
    let header = "---\n";
    Object.keys(metadata).forEach(key => {
      header += `${key}: ${metadata[key]}\n`;
    });
    header += "---\n";
    return header;
  },

  // split markdown header
  splitHeader(content) {
    // New line characters need to handle all operating systems.
    const lines = content.split(/\r?\n/);
    if (lines[0] !== "---") {
      return {};
    }
    let i = 1;
    for (; i < lines.length - 1; ++i) {
      if (lines[i] === "---") {
        break;
      }
    }
    return {
      header: lines.slice(1, i + 1).join("\n"),
      content: lines.slice(i + 1).join("\n"),
    };
  },

  // Extract markdown metadata header
  extractMetadata(content) {
    const metadata = {};
    const both = this.splitHeader(content);

    // if no content returned, then that means there was no header, and both.header is the content
    if (!both.content) {
      if (!both.header) {
        return { metadata, rawContent: content };
      }
      return { metadata, rawContent: both.header };
    }

    // New line characters => to handle all operating systems.
    const lines = both.header.split(/\r?\n/);

    // Loop that add to metadata the current content of the fields of the header
    // Like the format:
    // id:
    // title:
    // original_id:
    for (let i = 0; i < lines.length - 1; ++i) {
      const keyvalue = lines[i].split(":");
      const key = keyvalue[0].trim();
      let value = keyvalue
        .slice(1)
        .join(":")
        .trim();
      try {
        value = JSON.parse(value);
      } catch (err) {
        // Ignore the error as it means it's not a JSON value.
      }
      metadata[key] = value;
    }
    return { metadata, rawContent: both.content };
  },
};
