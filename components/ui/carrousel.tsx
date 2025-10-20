import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Paper from "./paper";

interface Props {
  sections: React.ReactNode[];
  slotProps?: {
    carrousel?: React.ComponentProps<any>;
    paper: React.ComponentProps<any>;
  };
}
export default function Carousel({ sections, slotProps }: Props) {
  const containerRef = React.useRef<ScrollView>(null);
  const [paperWidth, setPaperWidth] = React.useState<number | null>(300);

  const handleLayout = (event: any) => {
    const width = event.nativeEvent.layout.width;
    setPaperWidth(width - 3 - (slotProps?.paper?.style?.padding || 0) * 2);
  };

  return (
    <Paper {...slotProps?.paper} onLayout={handleLayout}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={[styles.container, slotProps?.carrousel?.style]}
        ref={containerRef}
      >
        {paperWidth !== null &&
          sections.map((child, index) => (
            <View
              key={index}
              style={[
                {
                  paddingHorizontal: 8,
                  width: paperWidth,
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
