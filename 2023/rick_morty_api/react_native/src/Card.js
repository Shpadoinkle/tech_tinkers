import { useMemo } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

const Card = ({ character }) => {
  const cardStatus = !!character?.status ? character.status.toLowerCase() : "";
  const cardBackground = useMemo(() => {
    if (cardStatus === "unknown") {
      return "https://i.pinimg.com/736x/d7/b4/af/d7b4afb4db39c0818f220c6726e0e1e9.jpg";
    }
    if (cardStatus === "dead") {
      return "https://i.pinimg.com/736x/61/0c/38/610c38fabddea7efcbc8ce35251a0405.jpg";
    }
    return "https://wallpapercave.com/wp/wp6737202.png";
  }, [cardStatus]);

  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: cardBackground }}
        style={styles.cardBackground}
      >
        <View style={styles.textWrapper}>
          <Text>{character.name}</Text>
        </View>
        <Image source={{ uri: character.image }} style={styles.heroImage} />
        <View style={styles.textWrapper}>
          <Text>{character.status}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 300,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    overflow: "hidden",
  },
  cardBackground: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    justifyContent: "space-between",
  },
  textWrapper: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 12,
  },
  heroImage: {
    width: "100%",
    height: 140,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 4,
  },
});

export default Card;
