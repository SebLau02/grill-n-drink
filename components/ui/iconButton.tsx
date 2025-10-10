import { useColor } from "@/hooks/useColor";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface Props extends PressableProps {
  children: React.ReactNode;
  color?: "primary" | "primary" | "secondary" | "error" | "danger" | "success";
  size?: "small" | "medium";
}
function IconButton({
  children,
  color = "primary",
  size = "medium",
  ...props
}: Props) {
  const textColor = useColor(color);
  const borderColor = useColor("border");
  const pressedColor = useColor("pressed");
  const disabledColor = useColor("disabled");

  if (props.disabled) {
    return (
      <Pressable
        {...props}
        style={[
          {
            alignSelf: "flex-start",
            borderRadius: 4,
          },
          sizeStyle[size],
        ]}
      >
        {typeof children === "string" ? (
          <Text style={{ color: disabledColor }}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? pressedColor : "transparent",
          borderColor: borderColor,
          alignSelf: "flex-start",
          borderRadius: 4,
        },
        sizeStyle[size],
      ]}
    >
      {typeof children === "string" ? (
        <Text style={{ color: textColor }}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export default IconButton;

const sizeStyle = StyleSheet.create({
  small: {
    padding: 8,
  },
  medium: {
    padding: 16,
  },
});
