import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import Main from "./src/Main";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <View style={styles.container}>
      <ApolloProvider client={client}>
        <Main />
        <StatusBar style="auto" />
      </ApolloProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05bdf1",
    width: Dimensions.get('window').width,
  },
});
