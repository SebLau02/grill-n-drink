import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

interface Props {
  variant: keyof typeof textVariants;
  color?: "primary" | "secondary" | "error" | "danger" | "success";
  children: React.ReactNode;
  sx?: TextStyle;
}

const colorMap = {
  primary: "text",
  secondary: "icon",
  error: "error",
  danger: "danger",
  success: "success",
};

function Typography({ variant, color = "primary", children, sx }: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const themeColorKey = colorMap[color] || "text";
  const themeColor =
    Colors[colorScheme][themeColorKey as keyof (typeof Colors)["light"]];
  return (
    <Text style={[textVariants[variant], { color: themeColor }, sx]}>
      {children}
    </Text>
  );
}

export default Typography;

const textVariants = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  h5: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 24,
  },
  h6: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
  },
  body1: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
});
