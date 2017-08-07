#!/usr/bin/env node
// Downloads various README files from GitHub.

const async = require('async');
const fetch = require('node-fetch');
const fs = require('fs');

const CONCURRENT_REQUESTS = 20;

function getDirectoryListing(repo) {
  let url = `https://api.github.com/repos/babel/${repo}/contents/packages?ref=master`;
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    // This is intentionally using client_id and client_secret rather than an access_token
    // so that accidental exposure of the access token does not expose API access.
    // Passing client_id and client_secret *without* an access token is sufficient to hit the
    // increased rate limits.
    url += `&client_id=${encodeURIComponent(process.env.GITHUB_CLIENT_ID)}`
    url += `&client_secret=${encodeURIComponent(process.env.GITHUB_CLIENT_SECRET)}`;
  }
  return fetch(url).then(res => res.json());
}

function getReadmeURLsFromDirectoryListing(repo, dir) {
  return dir
    .filter(file => file.type === 'dir')
    .map(file => ({
      name: file.name,
      uri: `/babel/${repo}/master/${file.path}/README.md`,
    }));
}

console.log('Retrieving package listing...');
Promise.all([getDirectoryListing('babel'), getDirectoryListing('babili')])
  .then(([babelPackages, babiliPackages]) => {
    const packages = [
      ...getReadmeURLsFromDirectoryListing('babel', babelPackages),
      ...getReadmeURLsFromDirectoryListing('babili', babiliPackages),
      // Special cases
      {
        name: 'babel-preset-env',
        uri: '/babel/babel-preset-env/master/README.md',
      },
      {
        name: 'babylon',
        uri: '/babel/babylon/master/README.md',
      },
    ];

    console.log('Downloading READMEs...');
    async.mapLimit(packages, CONCURRENT_REQUESTS, (package, cb) => {
      fetch(`https://raw.githubusercontent.com${package.uri}`)
        .then(res => res.text())
        .then(
          text => {
            fs.writeFile(`${__dirname}/../_includes/readmes/${package.name}.md`, text, cb);
            console.log(`- ${package.name}`);
          },
          err => {
            console.error(`Could not load ${package.name}: ${err}`);
          }
        );
    });
  })
  .catch(err => {
    console.error(`Could not retrieve package listing: ${err}`);
    process.exit(1);
  }
);
