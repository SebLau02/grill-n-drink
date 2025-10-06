import { StyleProp } from "react-native";

export interface CustomTheme {
  [key: string]: string;
}

export interface ComponentProps<T> {
  sx?: StyleProp<T>;
}
