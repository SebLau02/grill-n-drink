import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const colorMap = {
  primary: "text",
  secondary: "icon",
  error: "error",
  danger: "danger",
  success: "success",
  contained: "tabIconSelected",
  outlined: "transparent",
  text: "transparent",
  border: "border",
  pressed: "pressed",
  disabled: "disabled",
  background: "background",
  borderActive: "borderActive",
  textActive: "textActive",
  textLight: "text",
};

export function useColor(color: keyof typeof colorMap = "primary") {
  const colorScheme = useColorScheme() ?? "light";
  const themeColorKey = colorMap[color] || "text";
  return Colors[colorScheme][themeColorKey as keyof (typeof Colors)["light"]];
}
