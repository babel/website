#!/usr/bin/env node

if (process.env.NEXT_DOCS) process.exit();

const fs = require("fs");
const path = require("path");
const sgf = require("staged-git-files");
const chalk = require("chalk");

// Even though we don't care for renamed files, 'R' in filter
// is needed to recognize them as renamed instead of deleted + added
sgf("AMR", function(err, staged) {
  const versionFolders = require("../website/versions.json").map(
    version => `website/versioned_docs/version-${version}/`
  );
  const pastDocs = [];

  staged.forEach(file => {
    const { status, filename } = file;

    if (status == "Renamed") return;

    const ext = path.extname(filename);
    if (ext !== ".md" && ext !== ".markdown") {
      return;
    }

    if (filename.includes("/tools/")) return;

    if (filename.startsWith("docs/")) {
      versionFolders.forEach(folder => {
        const pastDoc = folder + path.basename(filename);
        if (
          fs.existsSync(pastDoc) &&
          !staged.some(stagedFile => stagedFile.filename === pastDoc)
        )
          pastDocs.push(pastDoc);
      });
      if (pastDocs.length) pastDocs.push("");
    }
  });

  if (!pastDocs.length) return;

  console.log(
    chalk`
> versioned docs check:
We noticed changes to some markdown files in the {yellow docs/} folder but no
corresponding changes in {yellow website/versioned_docs/}.

If this was a fix to the existing documentation please consider applying the
same fix to these files from the past versions:

  {red ${pastDocs.join("\n  ")}}
If you're sure you only want to modify the unpublished docs, ignore this and
set the {yellow NEXT_DOCS} env variable before committing again.`
  );

  process.exit(1);
});
