import { useColor } from "@/hooks/useColor";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface Props extends ViewProps {
  orientation?: "vertical" | "horizontal";
}
function Divider({ orientation = "horizontal", style, ...props }: Props) {
  const grey700 = useColor("grey700");
  return (
    <View
      {...props}
      style={[
        orienttationStyle[orientation],
        {
          backgroundColor: grey700,
        },
        style,
      ]}
    />
  );
}

export default Divider;

const orienttationStyle = StyleSheet.create({
  horizontal: {
    width: "100%",
    height: 1,
  },
  vertical: {
    width: 1,
    height: "100%",
  },
});
