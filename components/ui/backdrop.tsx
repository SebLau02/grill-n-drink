import { useBackdropStore } from "@/app/store/backdrop";
import { useColor } from "@/hooks/useColor";
import React from "react";
import {
  Dimensions,
  Pressable,
  PressableProps,
  StyleSheet,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface Props extends PressableProps {
  opacity?: number;
  color?: string;
}
function Backdrop({ children, color, opacity = 1, ...props }: Props) {
  const { open, setClose } = useBackdropStore();

  const backgroundColor = useColor("background");

  if (!open) return null;

  return (
    <Pressable
      {...props}
      style={(state) => [
        backdropStyle.backdrop,
        {
          backgroundColor: color ? color : backgroundColor,
          opacity: opacity,
        },
        typeof props.style === "function" ? props.style(state) : props.style,
      ]}
      onPress={(e) => {
        setClose();
        props.onPress?.(e);
      }}
    >
      {children}
    </Pressable>
  );
}

export default Backdrop;

const backdropStyle = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    width: screenWidth,
    height: screenHeight,
    overflow: "hidden",
  },
});
