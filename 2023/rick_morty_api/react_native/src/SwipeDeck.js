import { useRef } from "react";
import { Animated, Dimensions, PanResponder, StyleSheet } from "react-native";
import Card from "./Card";

const SCREEN_WIDTH = Dimensions.get("window").width;
// const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
// const SWIPE_OUT_DURATION = 250;

const SwipeDeck = ({ character, index, currentCard }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x, // x,y are Animated.Value
          dy: pan.y,
        },
      ],
      {
        listener: (event, gestureState) => {
          pan.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        useNativeDriver: false,
      }
    ),
    onPanResponderRelease: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        { toValue: { x: 0, y: 0 }, useNativeDriver: false } // Back to zero
      ).start();
    },
  });

  getCardRotation = () => {
    const rotate = pan.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });

    return {
      transform: [{ rotate }],
    };
  };

  if (index < currentCard) return null;

  if (index === currentCard) {
    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          pan.getLayout(),
          getCardRotation(),
          styles.panWrapper,
          { zIndex: 99 },
        ]}
      >
        <Card character={character} />
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.panWrapper,
        { top: 10 * (index - currentCard), zIndex: 50 - index },
      ]}
    >
      <Card character={character} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  panWrapper: {
    position: "absolute",
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
});

export default SwipeDeck;
