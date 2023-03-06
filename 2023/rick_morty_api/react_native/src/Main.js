import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import SwipeDeck from "./SwipeDeck";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
      }
      results {
        id
        name
        image
        status
        type
      }
    }
  }
`;

const Main = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });
  const characters = data?.characters?.results || [];
  // const next = data?.characters?.info?.next;

  return (
    <View style={styles.container}>
      <Text>Card Stack</Text>
      <Text>Cards Loaded: {characters.length}</Text>
      <View style={styles.deckContainer}>
        {characters.map((card, index) => (
          <SwipeDeck
            key={card.id}
            character={card}
            index={index}
            currentCard={currentCard}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    paddingTop: 60,
    width: Dimensions.get("window").width,
  },
  deckContainer: {
    marginTop: 20,
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});

export default Main;
