import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import Paper from "./paper";

const screenWidth = Dimensions.get("window").width;

interface Props {
  sections: React.ReactNode[];
  slotProps?: {
    carrousel?: React.ComponentProps<any>;
    paper: React.ComponentProps<any>;
  };
}
export default function Carousel({ sections, slotProps }: Props) {
  console.log(
    screenWidth -
      16 -
      (slotProps?.paper?.style?.padding ?? 0) * 2 -
      (slotProps?.paper?.style?.margin ?? 0) * 2,

    screenWidth
  );
  return (
    <Paper {...slotProps?.paper}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={[styles.container, slotProps?.carrousel?.style]}
      >
        {sections.map((child, index) => (
          <View
            key={index}
            style={[
              {
                paddingHorizontal: 8,
                width:
                  screenWidth -
                  (slotProps?.paper?.style?.padding ?? 0) * 2 -
                  (slotProps?.paper?.style?.margin ?? 0) * 2,
              },
            ]}
          >
            {child}
          </View>
        ))}
      </ScrollView>
    </Paper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  text: { fontSize: 24, color: "white", fontWeight: "bold" },
});
