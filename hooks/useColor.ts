import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const colorMap = {
  primary: "text",
  secondary: "icon",
  error: "error",
  danger: "danger",
  success: "success",
  info: "info",
  contained: "tabIconSelected",
  outlined: "transparent",
  text: "transparent",
  border: "border",
  pressed: "pressed",
  disabled: "disabled",
  background: "background",
  borderActive: "borderActive",
  textActive: "textActive",
  interactiveLight: "interactiveLight",
  textLight: "text",
  grey200: "grey200",
  grey300: "grey300",
  grey500: "grey500",
  grey700: "grey700",
  primary900: "primary900",
};

export function useColor(color: keyof typeof colorMap = "primary") {
  const colorScheme = useColorScheme() ?? "light";
  const themeColorKey = colorMap[color] || "text";
  return Colors[colorScheme][themeColorKey as keyof (typeof Colors)["light"]];
}
