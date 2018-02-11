#!/usr/bin/env node
// Downloads sponsors data from the Open Collective API.

const fetch = require("node-fetch");
const fs = require("fs");

const url = "https://opencollective.com/api/groups/babel/backers";

console.log("Downloading sponsors data from Open Collective...");
fetch(url)
  .then(res => res.text())
  .then(res => {
    fs.writeFile(`${__dirname}/../website/data/sponsors.json`, res, err => {
      if (err) {
        console.error("Failed to write website/data/sponsors.json file: ", err);
      } else {
        console.log("Success: website/data/sponsors.json created.");
      }
    });
  })
  .catch(err => console.error("Failed to fetch backers: ", err));
