#!/usr/bin/env node
// Downloads sponsors data from the Open Collective API.

const fetch = require("node-fetch");
const fs = require("fs");

const graphqlEndpoint = "https://api.opencollective.com/graphql/v2";

const graphqlQuery = `{
  account(slug: "babel") {
    orders(status: ACTIVE, limit: 1000) {
      totalCount
      nodes {
        tier {
          slug
        }
        fromAccount {
          name
          slug
          website
          imageUrl
          description
        }
      }
    }
  }
}`;

const sponsorsFile = `${__dirname}/../website/data/sponsors.json`;

console.log("Downloading sponsors data from Open Collective...");

fetch(graphqlEndpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: graphqlQuery }),
})
  .then(res => res.json())
  .then(res => res.data.account.orders.nodes)
  .then(nodes =>
    nodes
      .filter(node => !!node.tier)
      .map(node => ({
        tier: node.tier.slug,
        name: node.fromAccount.name,
        slug: node.fromAccount.slug,
        website: node.fromAccount.website,
        avatar: node.fromAccount.imageUrl,
        twitterHandle: node.fromAccount.twitterHandle,
        description: node.fromAccount.description,
      }))
  )
  .then(sponsors => JSON.stringify(sponsors, null, 2))
  .then(sponsorsJson => {
    fs.writeFile(sponsorsFile, sponsorsJson, err => {
      if (err) {
        console.error("Failed to write website/data/sponsors.json file: ", err);
      } else {
        console.log("Success: website/data/sponsors.json created.");
      }
    });
  })
  .catch(err => {
    console.error("Failed to fetch backers: ", err);
  });
