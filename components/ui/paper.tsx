import { Metrics } from "@/constants/theme";
import { useColor } from "@/hooks/useColor";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

export interface PaperProps extends ViewProps {
  children?: React.ReactNode;
  variant?: "outlined" | "elevation";
  elevation?: keyof typeof elevationsVariants;
}
function Paper({
  children,
  variant = "outlined",
  elevation = 1,
  ...props
}: PaperProps) {
  const grey200 = useColor("grey200");

  return (
    <View
      {...props}
      style={[
        paperStyle[variant],
        props.style,
        { backgroundColor: grey200, borderRadius: Metrics.radius },
        variant === "elevation" ? elevationsVariants[elevation] : {},
      ]}
    >
      {children}
    </View>
  );
}

export default Paper;

const paperStyle = StyleSheet.create({
  outlined: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
  },
  elevation: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const elevationsVariants = {
  0: {
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  1: {
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  2: {
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  3: {
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  4: {
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  6: {
    elevation: 6,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  8: {
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  12: {
    elevation: 12,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.3,
    shadowRadius: 6.27,
  },
  16: {
    elevation: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.37,
    shadowRadius: 6.49,
  },
  24: {
    elevation: 24,
    shadowOffset: { width: 0, height: 11 },
    shadowOpacity: 0.44,
    shadowRadius: 11.14,
  },
};
