import * as React from "react";
import { Dimensions, StyleProp, ViewStyle } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import Paper, { PaperProps } from "./paper";

const screenWidth = Dimensions.get("window").width;

interface Props {
  cards: React.ReactNode[];
  width?: number;
  height?: number;
  cardsProps?: PaperProps;
  style?: StyleProp<ViewStyle>;
}
function Carrousel({
  cards,
  width = screenWidth,
  height = 220,
  cardsProps,
  style,
}: Props) {
  const ref = React.useRef<ICarouselInstance>(null);

  return (
    <Carousel
      ref={ref}
      autoPlayInterval={2000}
      data={cards}
      height={height}
      loop={false}
      pagingEnabled={true}
      snapEnabled={true}
      width={width * 0.75}
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: height,
        },
        style,
      ]}
      mode={"horizontal-stack"}
      modeConfig={{
        snapDirection: "left",
        stackInterval: 18,
      }}
      customConfig={() => ({ type: "positive", viewCount: 5 })}
      renderItem={({ item }) => (
        <Paper
          {...cardsProps}
          style={[
            cardsProps?.style,
            {
              width: "100%",
              height: "100%",
            },
          ]}
        >
          {item}
        </Paper>
      )}
    />
  );
}

export default Carrousel;
