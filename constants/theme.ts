/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#68261E";
const tintColorDark = "#68261E";

export const Metrics = {
  radius: 4,
};

const palette = {
  text: "#FFFFFF",
  background: "#2B2B2B",
  icon: "#FFFFFF",
  tabIconDefault: "#7a0606ff",
  error: "#D32F2F",
  danger: "#FFA726",
  success: "#388E3C",
  info: "#2196F3",
  border: "#565656",
  borderActive: "#9B4237",
  pressed: "#532923",
  disabled: "#B7B7B7",
  textActive: "#FFD2CA",
  interactiveLight: "#762A21",
  grey200: "#313131",
  grey300: "#393939",
  grey500: "#434343",
  grey700: "#565656",
};

export const Colors = {
  light: { ...palette, tint: tintColorLight, tabIconSelected: tintColorLight },
  dark: {
    ...palette,
    tint: tintColorDark,
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
    /** Polices personnalisées */
    bricolage: "BricolageGrotesque-Variable",
    raleway: "Raleway-Variable",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
    /** Polices personnalisées */
    bricolage: "BricolageGrotesque-Variable",
    raleway: "Raleway-Variable",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    /** Polices personnalisées */
    bricolage: "BricolageGrotesque-Variable",
    raleway: "Raleway-Variable",
  },
});
