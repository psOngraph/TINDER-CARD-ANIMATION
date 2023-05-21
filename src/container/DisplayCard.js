import React, { useRef, useState, useEffect } from "react";
import { Animated, PanResponder, Dimensions, StyleSheet } from "react-native";
import MainCard from "../component/MainCard";

const DATA = [
  {
    id: 1,
    text: "Burger",
    uri: "https://www.teenaagnel.com/wp-content/uploads/2019/12/food-photography-in-dubai.jpg",
    btnText: "View More",
  },
  {
    id: 2,
    text: "Salad",
    uri: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    btnText: "View More",
  },
  {
    id: 3,
    text: "Fried Chicken",
    uri: "https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg",
    btnText: "View More",
  },
  {
    id: 4,
    text: "Pasta",
    uri: "https://www.refrigeratedfrozenfood.com/ext/resources/NEW_RD_Website/DefaultImages/default-pasta.jpg?1430942591",
    btnText: "View More",
  },
  {
    id: 5,
    text: "Pizza",
    uri: "https://assets.bonappetit.com/photos/61ba6c608b982b70ee630929/3:2/w_5329,h_3552,c_limit/20211118-0222-Healthyish0802.jpg",
    btnText: "View More",
  },
  {
    id: 6,
    text: "Noodles",
    uri: "https://c.ndtvimg.com/2021-04/umk8i7ko_pasta_625x300_01_April_21.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886",
    btnText: "View More",
  },
  {
    id: 7,
    text: "Chole Bhature",
    uri: "https://www.japjitravel.com/blog/wp-content/uploads/2022/11/Chole-Bhature-of-Jalandhar.jpg",
    btnText: "View More",
  },
];
const NO_CARD_DATA = {
  id: 100,
  text: "NO CARDS TO SWIPE",
  uri: "https://thumbs.dreamstime.com/b/end-lettering-quote-hand-drawn-letter-cards-prints-logotypes-book-handwritten-final-inscription-illustration-calligraphic-174020944.jpg",
  btnText: "Get More",
};
const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.2 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 300;

const DisplyCards = ({ onSwipeLeft = () => {}, onSwipeRight = () => {} }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        return position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forciblySwap("RIGHT");
          console.log("Swapped to right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forciblySwap("LEFT");
          console.log("You swapped to left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;
  const [index, setIndex] = useState(0);

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
    }).start();
  };
  const forciblySwap = (direction) => {
    const x = direction === "LEFT" ? -SCREEN_WIDTH * 1.5 : SCREEN_WIDTH * 1.5;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction) => {
    const item = DATA[index];
    direction === "LEFT" ? onSwipeLeft(item) : onSwipeRight(item);
    position.setValue({ x: 0, y: 0 });
    setIndex((prevIndex) => prevIndex + 1);
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };
  const renderNoCards = () => (
    <Animated.View style={styles.cardStyles}>
      <MainCard data={NO_CARD_DATA} />
    </Animated.View>
  );

  const renderCards = () => {
    if (index >= DATA.length) {
      console.log("hello norender card");
      return renderNoCards();
    }

    return DATA.map((item, idx) => {
      if (idx < index) return null;

      if (index === idx) {
        return (
          <Animated.View
            key={item.id}
            style={[getCardStyle(), styles.cardStyles]}
            {...panResponder.panHandlers}
          >
            <MainCard data={item} key={item.id} />
          </Animated.View>
        );
      }
      return (
        <Animated.View
          key={item.id}
          style={[styles.cardStyles, { top: 10 * (idx - index) }]}
        >
          <MainCard data={item} key={item.id} />
        </Animated.View>
      );
    }).reverse();
  };
  return renderCards();
};

export default DisplyCards;

const styles = StyleSheet.create({
  cardStyles: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
});
