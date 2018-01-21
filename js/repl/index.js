// @flow

import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import Repl from "./Repl";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://babel-plugins.now.sh/graphql" }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Repl />
  </ApolloProvider>,
  document.getElementById("root")
);

if (module.hot) {
  // $FlowFixMe
  module.hot.accept();
}
