import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  /**
   * Original graphql has shut down.  Using clones
   */
  // uri: "https://api.spacex.land/graphql/",
  uri: "https://spacex-production.up.railway.app/",
  cache: new InMemoryCache(),
});

export default client;
