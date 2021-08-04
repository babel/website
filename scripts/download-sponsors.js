#!/usr/bin/env node
// Downloads sponsors data from the Open Collective API.

const fetch = require("node-fetch");
const fs = require("fs").promises;

const graphqlEndpoint = "https://api.opencollective.com/graphql/v2";

// all from webpack: https://github.com/webpack/webpack.js.org/blob/master/src/utilities/fetch-supporters.js
const REQUIRED_KEYS = ["totalDonations", "slug", "name"];
const sponsorsFile = `${__dirname}/../website/data/sponsors.json`;

// https://github.com/opencollective/opencollective-api/blob/master/server/graphql/v2/query/TransactionsQuery.ts#L81
const graphqlPageSize = 1000;

const membersGraphqlQuery = `query account($limit: Int, $offset: Int) {
  account(slug: "babel") {
    members(limit: $limit, offset: $offset) {
      nodes {
        account {
          name
          slug
          website
          imageUrl
          description
        }
        totalDonations {
          value
        }
        createdAt
      }
    }
  }
}`;

// only query transactions in last year
const transactionsGraphqlQuery = `query transactions($dateFrom: DateTime, $limit: Int, $offset: Int) {
  transactions(account: {
    slug: "babel"
  }, dateFrom: $dateFrom, limit: $limit, offset: $offset, includeIncognitoTransactions: false) {
    nodes {
        amountInHostCurrency {
          value
        }
        fromAccount {
          name
          slug
          website
          imageUrl
        }
        createdAt
      }
  }
}`;

const nodeToSupporter = node => ({
  name: node.account.name,
  slug: node.account.slug,
  website: node.account.website,
  avatar: node.account.imageUrl,
  firstDonation: node.createdAt,
  totalDonations: node.totalDonations.value,
  yearlyDonations: 0,
  monthlyDonations: 0,
});

const getAllNodes = async (graphqlQuery, getNodes, time = "year") => {
  const body = {
    query: graphqlQuery,
    variables: {
      limit: graphqlPageSize,
      offset: 0,
      dateFrom: new Date(
        time === "year"
          ? new Date().setFullYear(new Date().getFullYear() - 1) // data from last year
          : new Date().setMonth(new Date().getMonth() - 1) // data from last month
      ).toISOString(),
    },
  };

  const allNodes = [];

  // Handling pagination if necessary
  // eslint-disable-next-line
  while (true) {
    const result = await fetch(graphqlEndpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => response.json());
    if (result.errors) {
      const {
        extensions: { code },
        message,
        locations: [{ line, column }],
      } = result.errors[0];
      throw new Error(`[${code}] ${message} (${line}:${column})`);
    }
    const nodes = getNodes(result.data);
    allNodes.push(...nodes);
    body.variables.offset += graphqlPageSize;
    if (nodes.length < graphqlPageSize) {
      return allNodes;
    } else {
      // sleep for a while
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
};

const uniqBy = (arr, predicate) => {
  const cb = typeof predicate === "function" ? predicate : o => o[predicate];

  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item);

        map.has(key) || map.set(key, item);

        return map;
      }, new Map())
      .values(),
  ];
};

(async () => {
  const members = await getAllNodes(
    membersGraphqlQuery,
    data => data.account.members.nodes
  );
  let supporters = members
    .map(nodeToSupporter)
    .sort((a, b) => b.totalDonations - a.totalDonations);

  // Deduplicating supporters with multiple orders
  supporters = uniqBy(supporters, "slug");

  const supportersBySlug = new Map();
  for (const supporter of supporters) {
    for (const key of REQUIRED_KEYS) {
      if (!supporter || typeof supporter !== "object") {
        throw new Error(
          `Supporters: ${JSON.stringify(supporter)} is not an object.`
        );
      }
      if (!(key in supporter)) {
        throw new Error(
          `Supporters: ${JSON.stringify(supporter)} doesn't include ${key}.`
        );
      }
    }
    supportersBySlug.set(supporter.slug, supporter);
  }

  // Calculate monthly amount from transactions
  const transactionsYear = await getAllNodes(
    transactionsGraphqlQuery,
    data => data.transactions.nodes
  );
  for (const transaction of transactionsYear) {
    if (!transaction.amountInHostCurrency) continue;
    const amount = transaction.amountInHostCurrency.value;
    if (!amount || amount <= 0) continue;
    const supporter = supportersBySlug.get(transaction.fromAccount.slug);
    if (!supporter) continue;
    supporter.yearlyDonations += amount;
  }

  const transactionsMonth = await getAllNodes(
    transactionsGraphqlQuery,
    data => data.transactions.nodes,
    "month"
  );

  for (const transaction of transactionsMonth) {
    if (!transaction.amountInHostCurrency) continue;
    const amount = transaction.amountInHostCurrency.value;
    if (!amount || amount <= 0) continue;
    const supporter = supportersBySlug.get(transaction.fromAccount.slug);
    if (!supporter) continue;
    supporter.monthlyDonations += amount;
  }

  for (const supporter of supporters) {
    supporter.yearlyDonations = Math.round(supporter.yearlyDonations);
    supporter.monthlyDonations = Math.round(supporter.monthlyDonations);
  }

  // Write the file
  return fs
    .writeFile(sponsorsFile, JSON.stringify(supporters, null, 2))
    .then(() => console.log(`Fetched 1 file: sponsors.json`));
})().catch(error => {
  console.error("utilities/fetch-supporters:", error);
  process.exitCode = 1;
});
